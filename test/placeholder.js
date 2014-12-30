var path = require('path'),
    fs = require('fs-extra'),

    async = require('async'),
    _ = require('lodash'),

    chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should(),

    sinon = require('sinon');

var lib = require('../lib');

describe('DB', function () {
    it('should be ok', function(){
        lib.test();
        expect(true).to.eql(true);

    })
});
