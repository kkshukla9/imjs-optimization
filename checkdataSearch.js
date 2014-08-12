function rol(p1,p2,p3,p4,p5){recordOutboundLink(p1,p2,p3,p4,p5);}
function srch(f,s,ts,p,pu,key,rolkey){
			s=key+'='+escape(s);
			s=pu+s;
			s=myReplace(s,"\\\\?\\\\&","?");
			if(ts==1) rol(s,'Trac-AutoSuggest',p,0,0);
			rol(s,rolkey,p,0,1);
			window.location = s;
            return false;
}
//wa=webAddress|f=Form|p=position
function CheckDataSearch(f)
{
    var http='http://'; var ts=trackSuggest;var url='';
	var wa = http+location.hostname;
    var im='indiamart.com';var dirfl='/cgi/catprdsearch.mp?';var trdfl='/search.mp?';var buyfl='/buyersearch.mp?';
    var p=(f.name=='searchForm')?'Search-Top':(f.name=='searchForm1')?'Search-Bottom':'Search-Top';
    try{sugg.recent('searches',f.ss.value)}catch(e){}
	f.ss.value=f.ss.value.replace(/^\s+|\s+$/g,'').replace(/\s+/g, ' ');
	if (f.ss.value.match(/(Enter\s+.*?Search)/i))
	{
		alert("Please enter a valid text to search.");
		f.ss.focus();
		return false;
	}
	if (f.ss.value.replace(/\s/g,'').length < 1){
		alert("Please enter text to search.");
		f.ss.focus();
		return false;
	}else{
		if (f.ss.value.replace(/\s/g, '').match(/^[^0-9a-zA-Z ]+$/)){
			alert("Enter at least one alphanumeric characters for search.");
			f.ss.focus();
			return false;
		}
		var str = f.ss.value.replace(/\s|%20/g, '+');
		if(f.txv.value == "Products" || f.txv.value == "products" || f.txv.value == "Suppliers"){
			url= wa.match(/dir\.i/) ?  wa+dirfl : http+"dir."+im+dirfl;
            return srch(f,str,ts,p,url,'ss','Trac-Search');
		}else if(f.txv.value == "Sell Offers"){
			url= wa.match(/trade\.i/)? wa+trdfl : http+"trade."+im+trdfl;
			f.search.value = str;
            return srch(f,str,ts,p,url,'search','ETO');
		}else if(f.txv.value == "Tenders"){
            url=http+"tenders."+im+"/search.cgi?";
            return srch(f,str,ts,p,url,'search','Tenders');
		}else if(f.txv.value == "Buy Leads"){
			url= (wa.match(/dev-/)) ? http+"dev-trade."+im+buyfl : (wa.match(/stg-/)) ? http+"stg-trade."+im+buyfl : http+"trade."+im+buyfl;
			var city = (f.city && f.city.value) ? '&city='+escape(f.city.value) : '';
            str=str+city;
			if(f.tradeSearch && f.tradeSearch.value == 1){
                p='BL-Tab';
				f.tradeSearch.value = '';
			}
            return srch(f,str,ts,p,url,'search','ETO');
		}
	}
}
