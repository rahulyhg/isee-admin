var schema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
    },
    retailLocationId: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
        index: true,
    },
    tillNumber: {
        type: String
    },
    date: {
        type: Date
    },
    openingBalance: {
        type: Number
    },
    additions: {
        type: Number
    },
    systemBalance: {
        type: Number
    },
    actualBalance: {
        type: Number
    },
    bankDeposit: {
        type: Number
    },
    closingBalance: {
        type: Number
    },
    employeeNumber: {
        type: String
    },
    randomNumber: {
        type: Number
    },
    //

    //for clik sense

    locationDataId:Number,
    activdate:Date,
    orgId:Number,
    

    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        index: true
    }],
});

schema.plugin(deepPopulate, {
    populate: {
        retailLocationId: {
            select: ""
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TillRegister', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "retailLocationId", "retailLocationId"));
var model = {

    getFromId: function (fieldName, fieldValue, callback) {
        var Model = this;
        if (!fieldValue || fieldValue == "") {
            callback(fieldName + " value is Blank");
        } else {
            var obj = {};
            obj[fieldName] = fieldValue;
            Model.findOne(obj).exec(function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err);
                } else {
                    callback(null, data._id);
                }
            });
        }
    },

    saveOnExcel: function (data, callback) {
        async.parallel({
                organizationId: function (callback) {
                    Company.getFromId("organizationId", data.organizationId, callback);
                },
                retailLocationId: function (callback) {
                    Locations.getFromId("retailLocationId", data.retailLocationId, callback);
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    data = _.assign(data, result);
                    TillRegister.saveData(data, callback);
                }
            });
    },

    getAllDataFromId: function (data, callback) {
        var Model = this;
        Model.findOne(data).lean().exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err);
            } else {
                callback(null, data._id);
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);