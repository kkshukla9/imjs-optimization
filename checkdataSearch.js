function rol(p1,p2,p3,p4,p5){recordOutboundLink(p1,p2,p3,p4,p5);}
//wa=webAddress|f=Form
function CheckDataSearch(f)
{
	var wa = 'http://'+location.hostname;
    var im='indiamart.com';var dirsrchfl='/cgi/catprdsearch.mp?';var trdsrchfl='/search.mp?';var buysrchfl='/buyersearch.mp?';
    var searchPosition=(f.name=='searchForm')?'Search-Top':(f.name=='searchForm1')?'Search-Bottom':'Search-Top';
    try{sugg.recent('searches',f.ss.value)}catch(e){}
	f.ss.value=f.ss.value.replace(/^\s+|\s+$/g,'').replace(/\s+/g, ' ');
    var re = /(Enter\s+.*?Search)/i;
	if (f.ss.value.match(re))
	{	
		alert("Please enter a valid text to search.");
		f.ss.focus();
		return false;
	}
	if (f.ss.value.replace(/\s/g, '').length < 1){	
		alert("Please enter text to search.");
		f.ss.focus();
		return false;
	}	
	else
	{
		if (f.ss.value.replace(/\s/g, '').match(/^[^0-9a-zA-Z ]+$/)){
			alert("Enter at least one alphanumeric characters for search.");
			f.ss.focus();
			return false;
		}
		var str = f.ss.value.replace(/\s/g, '+').replace(/%20/g, '+');
		if(f.txv.value == "Suppliers"){
			str ='ss='+escape(str);
			var page_url= wa.match(/dir\.i/) ? wa + dirsrchfl : "http://dir."+im+dirsrchfl;
			str = page_url+str;
			str = myReplace(str,"\\\\?\\\\&","?");
			if (trackSuggest == 1) rol(str, 'Trac-AutoSuggest', searchPosition,0,0); 
			rol(str, 'Trac-Search', searchPosition,0,1);
			window.location = str;
			return false;
		}
		else if(f.txv.value == "Products" || f.txv.value == "products"){		
			str ='ss='+escape(str);
			var page_url= wa.match(/dir\.i/) ?  wa + dirsrchfl : "http://dir."+im+dirsrchfl;
			str = page_url +str;
			str = myReplace(str,"\\\\?\\\\&","?");
			if (trackSuggest == 1) 	rol(str, 'Trac-AutoSuggest', searchPosition,0,0); 
			rol(str, 'Trac-Search', searchPosition,0,1);	
			window.location = str;
			return false;
		}
		else if(f.txv.value == "Sell Offers"){
			f.search.value = str;
			str ='search='+escape(str);
			str = myReplace(str,"\\\\?\\\\&","?");
			var page_url= wa.match(/trade\.i/) ?  wa +trdsrchfl : "http://trade."+im+trdsrchfl;
			var urlStr = page_url+str;
			window.location = urlStr;
			if (trackSuggest == 1) rol(urlStr, 'Trac-AutoSuggest', searchPosition,0,1); 
			rol(urlStr, 'ETO', searchPosition,0,0);	
			return false;
		}
		else if(f.txv.value == "Tenders"){
			str ='ss='+escape(str);
			str = "http://tenders."+im+"/search.cgi?"+str;
			str = myReplace(str,"\\\\?\\\\&","?");
			if (trackSuggest == 1) rol(str, 'Trac-AutoSuggest', searchPosition,0,0); 
			rol(str, 'Tenders', searchPosition,0,1);	
			window.location = str;
			return false;
		}
		else if(f.txv.value == "Buy Leads"){
			var param_city = (f.city && f.city.value) ? '&city='+escape(f.city.value) : '';
			str ='search='+escape(str);
			str = myReplace(str,"\\\\?\\\\&","?");
			var page_url= (wa.match(/dev-/)) ? "http://dev-trade."+im+buysrchfl : (wa.match(/stg-/)) ? "http://stg-trade."+im+buysrchfl : "http://trade."+im+buysrchfl;
			var urlStr = page_url+str+param_city;
			if (trackSuggest == 1) rol(urlStr, 'Trac-AutoSuggest', searchPosition,0,1);
			if (f.tradeSearch && f.tradeSearch.value == 1)
			{
				rol(urlStr, 'ETO', 'BL-Tab',0,0);
				f.tradeSearch.value = '';
			}else {
                rol(urlStr, 'ETO', searchPosition,0,0);	
			}
			window.location = urlStr;
			return false;
		}
	}
}
