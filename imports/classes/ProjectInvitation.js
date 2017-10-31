import {Class} from 'meteor/jagi:astronomy';

const ProjectInvitation = Class.create({
    name: 'ProjectInvitation',
    fields: {
        user_id: String,
        invitationMessage: {
            type: String,
            default: "",
            validators: [
                {
                    type: 'maxLength',
                    param: 1000
                }
            ],
        },
        sendAt: {
            type: Date,
            default: function () {
                return new Date()
            }
        },
        adminId: String,
        status: {
            type: String,
            default: "waiting"
        },
        answerMessage: {
            type: String,
            default: "",
            validators: [
                {
                    type: 'maxLength',
                    param: 1000
                }
            ],
        }
    },
});
export default ProjectInvitation