function rol(p1,p2,p3,p4,p5){recordOutboundLink(p1,p2,p3,p4,p5);}
//wa=webAddress|f=Form
function CheckDataSearch(f)
{
    var http='http://';
	var wa = http+location.hostname;
    var im='indiamart.com';var dirfl='/cgi/catprdsearch.mp?';var trdfl='/search.mp?';var buyfl='/buyersearch.mp?';var pos=(f.name=='searchForm')?'Search-Top':(f.name=='searchForm1')?'Search-Bottom':'Search-Top';
    try{sugg.recent('searches',f.ss.value)}catch(e){}
	f.ss.value=f.ss.value.replace(/^\s+|\s+$/g,'').replace(/\s+/g, ' ');
	if (f.ss.value.match(/(Enter\s+.*?Search)/i))
	{
		alert("Please enter a valid text to search.");
		f.ss.focus();
		return false;
	}
	if (f.ss.value.replace(/\s/g, '').length < 1){
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
		if(f.txv.value == "Suppliers"){
			str ='ss='+escape(str);
			var page_url= wa.match(/dir\.i/) ? wa + dirfl : http+"dir."+im+dirfl;
			str = page_url+str;
			str = myReplace(str,"\\\\?\\\\&","?");
			if (trackSuggest == 1) rol(str, 'Trac-AutoSuggest', pos,0,0);
			rol(str, 'Trac-Search', pos,0,1);
			window.location = str;
			return false;
		}else if(f.txv.value == "Products" || f.txv.value == "products"){
			str ='ss='+escape(str);
			var page_url= wa.match(/dir\.i/) ?  wa + dirfl : http+"dir."+im+dirfl;
			str = page_url +str;
			str = myReplace(str,"\\\\?\\\\&","?");
			if (trackSuggest == 1)	rol(str, 'Trac-AutoSuggest', pos,0,0);
			rol(str, 'Trac-Search', pos,0,1);
			window.location = str;
			return false;
		}else if(f.txv.value == "Sell Offers"){
			f.search.value = str;
			str ='search='+escape(str);
			str = myReplace(str,"\\\\?\\\\&","?");
			var page_url= wa.match(/trade\.i/)? wa +trdfl : http+"trade."+im+trdfl;
			var urlStr = page_url+str;
			window.location = urlStr;
			if (trackSuggest == 1) rol(urlStr, 'Trac-AutoSuggest', pos,0,1);
			rol(urlStr, 'ETO', pos,0,0);
			return false;
		}else if(f.txv.value == "Tenders"){
			str ='ss='+escape(str);
			str = http+"tenders."+im+"/search.cgi?"+str;
			str = myReplace(str,"\\\\?\\\\&","?");
			if (trackSuggest == 1) rol(str, 'Trac-AutoSuggest', pos,0,0);
			rol(str, 'Tenders', pos,0,1);
			window.location = str;
			return false;
		}else if(f.txv.value == "Buy Leads"){
			var param_city = (f.city && f.city.value) ? '&city='+escape(f.city.value) : '';
			str ='search='+escape(str);
			str = myReplace(str,"\\\\?\\\\&","?");
			var page_url= (wa.match(/dev-/)) ? http+"dev-trade."+im+buyfl : (wa.match(/stg-/)) ? http+"stg-trade."+im+buyfl : http+"trade."+im+buyfl;
			var urlStr = page_url+str+param_city;
			if(trackSuggest == 1) rol(urlStr, 'Trac-AutoSuggest', pos,0,1);
			if(f.tradeSearch && f.tradeSearch.value == 1)
			{
				rol(urlStr, 'ETO', 'BL-Tab',0,0);
				f.tradeSearch.value = '';
			}else{
                rol(urlStr, 'ETO', pos,0,0);
			}
			window.location = urlStr;
			return false;
		}
	}
}
