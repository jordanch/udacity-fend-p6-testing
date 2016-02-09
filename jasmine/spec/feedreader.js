/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        var length = allFeeds.length;

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test checks the allFeeds object to see whether a url property exists
         * on each object and whether the url is longer than 0 characters
         */
        it('has URL', function() {
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    // Test suite for The Menu
    describe('The menu', function() {

        /*
         * This spec checks whether the sliding menu is hidden by default.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*
         * This test checks whether the menu's visibility can be
         * toggled appropriately
         */
        it('toggles visibility when clicked', function() {
            $('body').toggleClass('menu-hidden');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('body').toggleClass('menu-hidden');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    // Test Suite for Initial Entries
    describe('Initial Entries', function() {

        beforeEach(function(done){
            loadFeed(0, done);
        });

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        it('has at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // Test Suite, "New Feed Selection"
    describe('New Feed Selection', function() {

        var currentHeading;
        var currentEntries;
        var cb = function(doneF) {
            loadFeed(1, doneF);
        };

        beforeEach(function(done) {
            loadFeed(0, function() {
                currentHeading = $('.header-title');
                currentEntries = $('.feed .entry h2');
                cb(done);
            });
        });
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        it('changes content when new feed is selected', function() {
            var changedHeading = $('.header-title').text();
            var changedEntries = $('.feed .entry h2').text();

            expect(changedHeading).not.toEqual(currentHeading);
            expect(changedEntries).not.toEqual(currentEntries);
        });
    });

}());
