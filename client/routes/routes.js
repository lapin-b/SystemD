/********
 * GENERAL ROUtES
 */
FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('layout', {main: 'landingPage', header: 'landingHead'});
    },
});

FlowRouter.route('/login', {
    name: 'App.login',
    action() {
        if (!Meteor.userId()) {
            BlazeLayout.render('noLayout', {main: 'loginPage'});
        } else {
            FlowRouter.go("/")
        }

    },
});


FlowRouter.notFound = {
    action() {
        BlazeLayout.render('noLayout', {main: 'notFound'});
    },
};

function checkLoggedOrReroute(context, redirect) {
    // context is the output of `FlowRouter.current()`
    if(!Meteor.userId()){
        console.log(context)
        redirect('/login')
    }
}
/*************
 * UserRoutes
 */
FlowRouter.route('/user-params', {
    name: 'App.userParams',
    triggersEnter: [checkLoggedOrReroute],
    action() {

        BlazeLayout.render('layout', {main: 'userParams'});
    },
});

