import {check} from "meteor/check";
import Project from "../../../imports/classes/Project";
import Comment from "../../../imports/classes/Comment";
import Publication from "../../../imports/classes/Publication";
import NotifPush from "../../../imports/NotifPush";


Comment.extend({
    meteorMethods: {

        newComment(authInfo, CommentParmas, notifObjects) {
            check(CommentParmas, {
                publicationId: String,
                isRootComment: Boolean,
                symEnc_content: String
            })
            check(authInfo, {memberId: String, userSignature: String})

            let publication = Publication.findOne(CommentParmas.publicationId)
            let currentProject = Project.findOne(publication.projectId)
            check(currentProject.isMember(authInfo), true)

            let computedParams = {
                projectId: currentProject._id,
                createdBy: authInfo.memberId
            }
            CommentParmas = {...CommentParmas, ...computedParams}
            let newComment = new Comment(CommentParmas)
            return newComment.save((err) => {
                if (!err) {
                    publication.commentCount++
                    publication.save()
                    check(notifObjects, [{
                        userId: String,
                        memberId: String,
                        hashControl: String
                    }])
                    console.warn("todo: envoyer les notifs")
                } else {
                    console.log(err)
                }
            })
        },
        delete(authInfo) {
            check(authInfo, {memberId: String, userSignature: String})
            let comment = Comment.findOne(this._id)
            let currentProject = Project.findOne(comment.projectId)
            check(currentProject.isMember(authInfo), true)
            check(authInfo.memberId === comment.createdBy, true)
            return comment.remove((err) => {
                console.warn('todo: remover les comments enfants')
            })
        }
    }
})
