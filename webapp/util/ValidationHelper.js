sap.ui.define([], function () {
    "use strict";

    return {
        isEmpty: function (sValue) {
            return !sValue || sValue.trim().length === 0;
        },
        isValidEmail: function(sEmail) {
            var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
            return sEmail.match(mailregex);
        }
    };
});
