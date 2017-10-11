import Project from '/imports/classes/Project';

Meteor.publish('UserPrivateInfo',function (id) {
    check(id, String);
    if(id === Meteor.userId())
    return Meteor.users.find(id);
});

Meteor.publish('singleProject', function(id) {
    check(id, String);
    return Project.find({_id : id });
});