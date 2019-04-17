import {check} from "meteor/check";
import Project from "../../../imports/classes/Project";
import Topic from "../../../imports/classes/Topic";
import MapMarker from "../../../imports/classes/MapMarker";
import NotifPush from "../../../imports/NotifPush";
import Comment from "../../../imports/classes/Comment";


MapMarker.extend({
    meteorMethods: {

        newIconMarker(authInfo, MapMarkerParmas) {
            check(MapMarkerParmas, {
                markerType: String,
                projectId: String,
                iconMarker: Object
            })
            check(authInfo, {memberId: String, userSignature: String})
            let currentProject = Project.findOne(MapMarkerParmas.projectId)
            check(currentProject.isMember(authInfo), true)

            let computedParams = {
                createdBy: authInfo.memberId,
            }
            MapMarkerParmas = {...MapMarkerParmas, ...computedParams}
            let newMapMarker = new MapMarker(MapMarkerParmas)
            return newMapMarker.save((err) => {
                if (!err) {
                    console.warn("todo : notifier les membres")
                    //topic.notifySubscribers(notifObjects, authInfo.memberId)
                } else {
                    console.log(err)
                }
            })
        },
        editMarkerTexts(authInfo, params) {
            check(authInfo, {memberId: String, userSignature: String})
            check(params, {
                symEnc_name: String,
                symEnc_detail: String
            })
            let mapMarker = MapMarker.findOne(this._id)

            let currentProject = Project.findOne(mapMarker.projectId)
            check(currentProject.isMember(authInfo), true)
            mapMarker[mapMarker.markerType].symEnc_name = params.symEnc_name
            mapMarker[mapMarker.markerType].symEnc_detail = params.symEnc_detail
            mapMarker.lastEditAt = new Date()
            return mapMarker.save()
        },
        changeIcon(authInfo, symEnc_icon) {
            check(authInfo, {memberId: String, userSignature: String})
            check(symEnc_icon, String)
            let mapMarker = MapMarker.findOne(this._id)

            let currentProject = Project.findOne(mapMarker.projectId)
            check(currentProject.isMember(authInfo), true)
            mapMarker[mapMarker.markerType].symEnc_icon = symEnc_icon
            mapMarker.lastEditAt = new Date()
            return mapMarker.save()
        },
        changeColor(authInfo, symEnc_color) {
            check(authInfo, {memberId: String, userSignature: String})
            check(symEnc_color, String)
            let mapMarker = MapMarker.findOne(this._id)

            let currentProject = Project.findOne(mapMarker.projectId)
            check(currentProject.isMember(authInfo), true)
            mapMarker[mapMarker.markerType].symEnc_color = symEnc_color
            mapMarker.lastEditAt = new Date()
            return mapMarker.save()
        },
        moveMarker(authInfo, symEnc_coordinates) {
            check(authInfo, {memberId: String, userSignature: String})
            check(symEnc_coordinates, String)
            let mapMarker = MapMarker.findOne(this._id)

            let currentProject = Project.findOne(mapMarker.projectId)
            check(currentProject.isMember(authInfo), true)
            mapMarker[mapMarker.markerType].symEnc_coordinates = symEnc_coordinates
            mapMarker.lastEditAt = new Date()
            return mapMarker.save()
        },
        delete(authInfo) {
            check(authInfo, {memberId: String, userSignature: String})
            let currentProject = Project.findOne(this.projectId)
            check(currentProject.isMember(authInfo), true)
            return this.remove()
        },
    }
})
