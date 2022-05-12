App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Tomb.json", function(tomb) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Tomb = TruffleContract(tomb);
      // Connect provider to interact with contract
      App.contracts.Tomb.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var tombInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Tomb.deployed().then(function(instance) {
      tombInstance = instance;
      return tombInstance.moralsCount();
    }).then(function(moralsCount) {
      var moralsResults = $("#moralsResults");
      moralsResults.empty();

      for (var i = 1; i <= moralsCount; i++) {
        tombInstance.morals(i).then(function(moral) {
          var id = moral[0];
          var name = moral[1];
          var RIPCount = moral[2];
          var died = moral[3];

          // Render tomb Result
          var tombTemplate = "<tr><th>" + name + "</th><td>" + died + "</td><td>" + RIPCount + "</td></tr>"
          tombResults.append(tombTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
