var phantom = require('phantom');
 phantom.create(function(ph) {
   ph.createPage(function(page) {
     page.open("http://www.ikea.com/kr/ko/catalog/productsaz/0/", function(status) {
       console.log("opened? ", status);
       page.evaluate((function() {
        var title=[];
        var link=[];
        var ptName=document.getElementsByClassName('productsAzLink');
        for(var i=0; i<ptName.length;i++) {
        title[i]=ptName[i].textContent;

        link[i]=ptName[i].getElementsByTagName('a')[0].href;
//        link[i]=ptName[i].getElementsByTag("a")[0].getElementsByAttribute("href")[0];
        }

//        title[3]=ptName[0].getElementsByTagName('a')[0].href;
        return link; 
       }), function(result) {
         
        for(x in result) console.log('item: ' + result[x]);
         ph.exit();
       });
     });
   });
 });

