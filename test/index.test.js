
var debug = require("..")
  , expect = require("expect.js");

describe("a debug function", function(){

  var log, str;

  before(function() {
    debug.clear();
    // Don't print to stdout
    debug.log = function(fmt) {
      str = fmt;
    };
  });

  afterEach(function() {
    str = "";
  });

  describe("should log", function(){

    it("when all debuggers are enabled", function() {
      debug.enable.all();
      debug("simple")("output");
      expect(str).to.equal("output");
    });

    it("when the config is exactly its name", function() {
      debug.config = 'simple';
      debug.reset();
      debug("simple")("output");
      expect(str).to.equal("output");
    });

    it("when the config contains its name", function() {
      debug.config = 'other,simple third';
      debug.reset();
      debug("simple")("output");
      expect(str).to.equal("output");
    });

    it("when the config matches its name", function() {
      debug.config = 'other,sim*,last';
      debug.reset();
      debug("simple")("output");
      expect(str).to.equal("output");
    });

  });

  describe("should not log", function(){

    it("when all debuggers are disabled", function() {
      debug.disable.all();
      debug("simple")("output");
      expect(str).to.equal("");
    });

    it("when the config disables exactly its name", function() {
      debug.config = '-simple';
      debug.reset();
      debug("simple")("output");
      expect(str).to.equal("");
    });

    it("when the config disables matches of its name", function() {
      debug.config = '-sim*';
      debug.reset();
      debug("simple")("output");
      expect(str).to.equal("");
    });

    it("when it is both disabled and enabled", function() {
      debug.config = 'simple,-sim*';
      debug.reset();
      debug("simple")("output");
      expect(str).to.equal("");
    });

  });

});