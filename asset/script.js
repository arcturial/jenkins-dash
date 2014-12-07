/**
 * Some knockout scripting to define a dynamic DOM that is generated based
 * on the content we receive from the Jenkins proxy call /data.
 *
 * Requests run every 5 seconds.
 * TODO Perhaps this should be configurable.
 */

var app = {
    jobs: ko.observableArray([]),
    showing: ko.observable(0),
    total: ko.observable(0),
    loading: ko.observable(false)
}

function Job(name, timestamp, build, color, host)
{
    var self = this;

    self.timestamp = timestamp;
    self.build = build;
    self.name   = name;
    self.color  = color;
    self.users = [];
    self.host = host;

    $(build.culprits).each(function (i, entry) {
        var address = "";

        for (var key in entry.property) {
            if (typeof entry.property[key].address !== 'undefined') {
                address = entry.property[key].address;
            }
        }

        self.users.push({ name: entry.fullName, gravatar: "http://www.gravatar.com/avatar/" + CryptoJS.MD5(address).toString() });
    });

    self.users = $.unique(self.users);
}

var request = function ()
{
    app.loading(true);

    $.get(
        "/data",
        function (data) {

            app.loading(false);
            app.jobs([]);
            var temp = [];
            var buffer = [];

            data = JSON.parse(data);

            $(data.jobs).each(function (i, entry) {
                // The color != 'disabled' is only here because I don't know how to do exclusions
                // with the Jenkins JSON API
                if (typeof entry.builds[0] !== 'undefined' && entry.color != 'disabled') {
                    temp.push(new Job(entry.displayName, entry.builds[0].timestamp, entry.builds[0], entry.color, entry.host));
                }
            });

            temp.sort(function(x, y) {
                return y.timestamp - x.timestamp;
            });

            // Put red builds at the top
            var i = temp.length;
            while (i--) {
                var entry = temp[i];
                if (entry.color == "red" || entry.color == "red_anime") {
                    buffer = buffer.concat(temp.splice(i, 1));
                }
            }

            temp = buffer.concat(temp);
            var chunk = temp.slice(0, 8);

            app.jobs(chunk);
            app.showing(chunk.length);
            app.total(temp.length);

            setTimeout(function () {
                request();
            }, 5000);
        }
    );

    return true;
}

ko.applyBindings(app);
request();