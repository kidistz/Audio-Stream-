angular.module('turnmeup.communication.components')
.controller('OpenChannelRedirectController', function ($location, $log, $q, $route, $timeout, Analytics, authentication, chance, group, user) {

        var vm = this;
        vm.currentUser = authentication.getUser();
        vm.requestedGroupStub = $route.current.params.url;

        Analytics.trackPage('/', 'Channel Redirect');

        getTemporaryUser()
            .then(fetchOrCreateGroup)
            .then(joinGroupIfNecessary)
            .then(redirectToGroup)
            .catch(function(){
                vm.errorText = "There's nobody talking in here right now";
                Analytics.trackEvent('Channel Redirect', 'Form Submitted', 'Redirect Error');
            });

        function redirectToGroup() {
            $log.info('Entering open group');
            return user.unsubscribeAll().then(function(){
                $log.debug('Successfully unsubscribed all');
                user.subscribe('public', vm.requestedGroupStub);
            }).then(function(){
                $log.debug('Successfully published to group');
                user.publish('public', vm.requestedGroupStub);
            }).then(function(){
                Analytics.trackEvent('Channel Redirect', 'Form Submitted', 'Redirect Success');
                if(!vm.errorText) {
                    $location.path('/mc/' + vm.requestedGroupStub).replace();
                }
            });
        };