var phantom = require('phantom');
var phantom2 = require('phantom');

var result=phantom.create(function(ph) {
  ph.createPage(function(page) {
    page.open('http://www.ikea.com/kr/ko/catalog/productsaz/0/',
      function(status) {
        console.log('Opened site? %s', status);
        another_funny(page, ph);
      });
	
  });
});



function another_funny(page, ph) {
  page.evaluate(function() {
    var h2Arr = [];
    var pArr = [];

    function funny() {
      var h2Arr = [];
      var link=[];
	  var title=[];
      var ptName=document.getElementsByClassName('productsAzLink');
	  for(var i=0; i<ptName.length;i++) {
			title[i]=ptName[i].textContent;
			link[i]=ptName[i].getElementsByTagName('a')[0].href;
			}
      var results = link;
      var i;
      for (i = 0; i < results.length; i++) {
        h2Arr.push(results[i]);
      }
      return h2Arr;
    }

    h2Arr = funny();
    return h2Arr;
  },
  function(result) {
    console.log(result);
	
	function deep(addr,iter) {
		var phantom2 = require('phantom');
		phantom2.create(function(ph) {
		  ph.createPage(function(page) {
			page.open(addr,
			  function(status) {
				console.log('Opened site? %s', status);
				another_funny2(page, ph);
			  });
			
		  });
		});
	}
	var cap=9;
	console.log('length='+result.length);
	for(var iter=0;iter<result.length-1;iter++) {
	deep(result[iter]);
	}
//	deep(result[0]);
//	deep(result[1]);
	ph.exit();
	return result;
  });
}


function another_funny2(page, ph) {
  page.evaluate(function() {
    var h2Arr = [];
    var pArr = [];

    function funny() {
      
	  var titleArr=[];
	  var priceArr=[];
	  var combo=[];
      var price=document.getElementsByClassName('price regularPrice');
	  var title=document.getElementsByClassName('productTitle floatLeft');
	  for(var i=0; i<price.length;i++) {
			priceArr[i]=price[i].textContent.replace(/[^0-9]/g,'');
			titleArr[i]=title[i].textContent;
			combo[i]=titleArr[i]+priceArr[i]+', ';
			//link[i]=ptName[i].getElementsByTagName('a')[0].href;
			}
      var results = combo;
      var i;
      for (i = 0; i < results.length; i++) {
        h2Arr.push(results[i]);
      }
      return h2Arr;
    }

    h2Arr = funny();
    return h2Arr;
  },
  function(result) {
	var output='title : '
    for(x in result) output=output+result[x]+', ';
	console.log(output);
	ph.exit();
	return result;
  });
}


//setTimeout(function(){console.log(result);},5000);