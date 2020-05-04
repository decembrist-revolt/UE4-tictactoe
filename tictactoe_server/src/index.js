System.register(["ws"], function (exports_1, context_1) {
    "use strict";
    var ws_1, ws;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ws_1_1) {
                ws_1 = ws_1_1;
            }
        ],
        execute: function () {
            ws = new ws_1["default"]('ws://www.host.com/path');
            ws.on('open', function open() {
                ws.send('something');
            });
            ws.on('message', function incoming(data) {
                console.log(data);
            });
        }
    };
});
//# sourceMappingURL=index.js.map