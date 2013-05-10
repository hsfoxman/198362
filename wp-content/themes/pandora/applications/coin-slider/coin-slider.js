/**
 * Coin Slider - Unique jQuery Image Slider
 * @version: 1.0 - (2010/04/04)
 * @requires jQuery v1.2.2 or later 
 * @author Ivan Lazarevic
 * Examples and documentation at: http://workshop.rs/projects/coin-slider/
 
 * Licensed under MIT licence:
 *   http://www.opensource.org/licenses/mit-license.php
**/

(function(jQuery) {

	var params 		= new Array;
	var order		= new Array;
	var images		= new Array;
	var links		= new Array;
	var linksTarget = new Array;
	var titles		= new Array;
	var interval	= new Array;
	var imagePos	= new Array;
	var appInterval = new Array;	
	var squarePos	= new Array;	
	var reverse		= new Array;
	
	jQuery.fn.coinslider= jQuery.fn.CoinSlider = function(options){
		
		init = function(el){
				
			order[el.id] 		= new Array();	// order of square appereance
			images[el.id]		= new Array();
			links[el.id]		= new Array();
			linksTarget[el.id]	= new Array();
			titles[el.id]		= new Array();
			imagePos[el.id]		= 0;
			squarePos[el.id]	= 0;
			reverse[el.id]		= 1;						
				
			params[el.id] = jQuery.extend({}, jQuery.fn.coinslider.defaults, options);
						
			// create images, links and titles arrays
			jQuery.each(jQuery('#'+el.id+' img'), function(i,item){
				images[el.id][i] 		= jQuery(item).attr('src');
				links[el.id][i] 		= jQuery(item).parent().is('a') ? jQuery(item).parent().attr('href') : '';
				linksTarget[el.id][i] 	= jQuery(item).parent().is('a') ? jQuery(item).parent().attr('target') : '';
				titles[el.id][i] 		= jQuery(item).next().is('span') ? jQuery(item).next().html() : '';
				jQuery(item).hide();
				jQuery(item).next().hide();
			});			
			

			// set panel
			jQuery(el).css({
				'background-image':'url('+images[el.id][0]+')',
				'width': params[el.id].width,
				'height': params[el.id].height,
				'position': 'relative',
				'background-position': 'top left'
			}).wrap("<div class='coin-slider' id='coin-slider-"+el.id+"' />");	
			
				
			// create title bar
			jQuery('#'+el.id).append("<div class='cs-title' id='cs-title-"+el.id+"' style='position: absolute; bottom:0; left: 0; z-index: 1000;'></div>");
						
			jQuery.setFields(el);
			
			if(params[el.id].navigation)
				jQuery.setNavigation(el);
			
			jQuery.transition(el,0);
			jQuery.transitionCall(el);
				
		}
		
		// squares positions
		jQuery.setFields = function(el){
			
			tWidth = sWidth = parseInt(params[el.id].width/params[el.id].spw);
			tHeight = sHeight = parseInt(params[el.id].height/params[el.id].sph);
			
			counter = sLeft = sTop = 0;
			tgapx = gapx = params[el.id].width - params[el.id].spw*sWidth;
			tgapy = gapy = params[el.id].height - params[el.id].sph*sHeight;
			
			for(i=1;i <= params[el.id].sph;i++){
				gapx = tgapx;
				
					if(gapy > 0){
						gapy--;
						sHeight = tHeight+1;
					} else {
						sHeight = tHeight;
					}
				
				for(j=1; j <= params[el.id].spw; j++){	

					if(gapx > 0){
						gapx--;
						sWidth = tWidth+1;
					} else {
						sWidth = tWidth;
					}

					order[el.id][counter] = i+''+j;
					counter++;
					
					if(params[el.id].links)
						jQuery('#'+el.id).append("<a href='"+links[el.id][0]+"' class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></a>");
					else
						jQuery('#'+el.id).append("<div class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></div>");
								
					// positioning squares
					jQuery("#cs-"+el.id+i+j).css({ 
						'background-position': -sLeft +'px '+(-sTop+'px'),
						'left' : sLeft ,
						'top': sTop
					});
				
					sLeft += sWidth;
				}

				sTop += sHeight;
				sLeft = 0;					
					
			}
			
			
			jQuery('.cs-'+el.id).mouseover(function(){
				jQuery('#cs-navigation-'+el.id).show();
			});
		
			jQuery('.cs-'+el.id).mouseout(function(){
				jQuery('#cs-navigation-'+el.id).hide();
			});	
			
			jQuery('#cs-title-'+el.id).mouseover(function(){
				jQuery('#cs-navigation-'+el.id).show();
			});
		
			jQuery('#cs-title-'+el.id).mouseout(function(){
				jQuery('#cs-navigation-'+el.id).hide();
			});	
			
			if(params[el.id].hoverPause){	
				jQuery('.cs-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				jQuery('.cs-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});	
				
				jQuery('#cs-title-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				jQuery('#cs-title-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});	
			}
					
			
		};
				
		
		jQuery.transitionCall = function(el){
		
			clearInterval(interval[el.id]);	
			delay = params[el.id].delay + params[el.id].spw*params[el.id].sph*params[el.id].sDelay;
			interval[el.id] = setInterval(function() { jQuery.transition(el)  }, delay);
			
		}
		
		// transitions
		jQuery.transition = function(el,direction){
			
			if(params[el.id].pause == true) return;
			
			jQuery.effect(el);
			
			squarePos[el.id] = 0;
			appInterval[el.id] = setInterval(function() { jQuery.appereance(el,order[el.id][squarePos[el.id]])  },params[el.id].sDelay);
					
			jQuery(el).css({ 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });
			
			if(typeof(direction) == "undefined")
				imagePos[el.id]++;
			else
				if(direction == 'prev')
					imagePos[el.id]--;
				else
					imagePos[el.id] = direction;
		
			if  (imagePos[el.id] == images[el.id].length) {
				imagePos[el.id] = 0;
			}
			
			if (imagePos[el.id] == -1){
				imagePos[el.id] = images[el.id].length-1;
			}
	
			jQuery('.cs-button-'+el.id).removeClass('cs-active');
			jQuery('#cs-button-'+el.id+"-"+(imagePos[el.id]+1)).addClass('cs-active');
			
			if(titles[el.id][imagePos[el.id]]){
				jQuery('#cs-title-'+el.id).css({ 'opacity' : 0 }).animate({ 'opacity' : params[el.id].opacity }, params[el.id].titleSpeed);
				jQuery('#cs-title-'+el.id).html(titles[el.id][imagePos[el.id]]);
			} else {
				jQuery('#cs-title-'+el.id).css('opacity',0);
			}				
				
		};
		
		jQuery.appereance = function(el,sid){

			jQuery('.cs-'+el.id).attr('href',links[el.id][imagePos[el.id]]).attr('target',linksTarget[el.id][imagePos[el.id]]);

			if (squarePos[el.id] == params[el.id].spw*params[el.id].sph) {
				clearInterval(appInterval[el.id]);
				return;
			}

			jQuery('#cs-'+el.id+sid).css({ opacity: 0, 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });
			jQuery('#cs-'+el.id+sid).animate({ opacity: 1 }, 300);
			squarePos[el.id]++;
			
		};
		
		// navigation
		jQuery.setNavigation = function(el){
			// create prev and next 
			jQuery(el).append("<div id='cs-navigation-"+el.id+"'></div>");
			jQuery('#cs-navigation-'+el.id).hide();
			
			jQuery('#cs-navigation-'+el.id).append("<a href='#' id='cs-prev-"+el.id+"' class='cs-prev'>prev</a>");
			jQuery('#cs-navigation-'+el.id).append("<a href='#' id='cs-next-"+el.id+"' class='cs-next'>next</a>");
			jQuery('#cs-prev-'+el.id).css({
				'position' 	: 'absolute',
				'top'		: params[el.id].height/2 - 15,
				'left'		: 0,
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: params[el.id].opacity
			}).click( function(e){
				e.preventDefault();
				jQuery.transition(el,'prev');
				jQuery.transitionCall(el);		
			}).mouseover( function(){ jQuery('#cs-navigation-'+el.id).show() });
	
			jQuery('#cs-next-'+el.id).css({
				'position' 	: 'absolute',
				'top'		: params[el.id].height/2 - 15,
				'right'		: 0,
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: params[el.id].opacity
			}).click( function(e){
				e.preventDefault();
				jQuery.transition(el);
				jQuery.transitionCall(el);
			}).mouseover( function(){ jQuery('#cs-navigation-'+el.id).show() });
		
			// image buttons
			jQuery("<div id='cs-buttons-"+el.id+"' class='cs-buttons'></div>").appendTo(jQuery('#coin-slider-'+el.id));

			
			for(k=1;k<images[el.id].length+1;k++){
				jQuery('#cs-buttons-'+el.id).append("<a href='#' class='cs-button-"+el.id+"' id='cs-button-"+el.id+"-"+k+"'>"+k+"</a>");
			}
			
			jQuery.each(jQuery('.cs-button-'+el.id), function(i,item){
				jQuery(item).click( function(e){
					jQuery('.cs-button-'+el.id).removeClass('cs-active');
					jQuery(this).addClass('cs-active');
					e.preventDefault();
					jQuery.transition(el,i);
					jQuery.transitionCall(el);				
				})
			});	
			
			jQuery('#cs-navigation-'+el.id+' a').mouseout(function(){
				jQuery('#cs-navigation-'+el.id).hide();
				params[el.id].pause = false;
			});						

			jQuery("#cs-buttons-"+el.id).css({
				'left'			: '50%',
				'margin-left' 	: -images[el.id].length*15/2-5,
				'position'		: 'relative'
				
			});
			
				
		}




		// effects
		jQuery.effect = function(el){
			
			effA = ['random','swirl','rain','straight'];
			if(params[el.id].effect == '')
				eff = effA[Math.floor(Math.random()*(effA.length))];
			else
				eff = params[el.id].effect;

			order[el.id] = new Array();

			if(eff == 'random'){
				counter = 0;
				  for(i=1;i <= params[el.id].sph;i++){
				  	for(j=1; j <= params[el.id].spw; j++){	
				  		order[el.id][counter] = i+''+j;
						counter++;
				  	}
				  }	
				jQuery.random(order[el.id]);
			}
			
			if(eff == 'rain')	{
				jQuery.rain(el);
			}
			
			if(eff == 'swirl')
				jQuery.swirl(el);
				
			if(eff == 'straight')
				jQuery.straight(el);
				
			reverse[el.id] *= -1;
			if(reverse[el.id] > 0){
				order[el.id].reverse();
			}

		}

			
		// shuffle array function
		jQuery.random = function(arr) {
						
		  var i = arr.length;
		  if ( i == 0 ) return false;
		  while ( --i ) {
		     var j = Math.floor( Math.random() * ( i + 1 ) );
		     var tempi = arr[i];
		     var tempj = arr[j];
		     arr[i] = tempj;
		     arr[j] = tempi;
		   }
		}	
		
		//swirl effect by milos popovic
		jQuery.swirl = function(el){

			var n = params[el.id].sph;
			var m = params[el.id].spw;

			var x = 1;
			var y = 1;
			var going = 0;
			var num = 0;
			var c = 0;
			
			var dowhile = true;
						
			while(dowhile) {
				
				num = (going==0 || going==2) ? m : n;
				
				for (i=1;i<=num;i++){
					
					order[el.id][c] = x+''+y;
					c++;

					if(i!=num){
						switch(going){
							case 0 : y++; break;
							case 1 : x++; break;
							case 2 : y--; break;
							case 3 : x--; break;
						
						}
					}
				}
				
				going = (going+1)%4;

				switch(going){
					case 0 : m--; y++; break;
					case 1 : n--; x++; break;
					case 2 : m--; y--; break;
					case 3 : n--; x--; break;		
				}
				
				check = jQuery.max(n,m) - jQuery.min(n,m);			
				if(m<=check && n<=check)
					dowhile = false;
									
			}
		}

		// rain effect
		jQuery.rain = function(el){
			var n = params[el.id].sph;
			var m = params[el.id].spw;

			var c = 0;
			var to = to2 = from = 1;
			var dowhile = true;


			while(dowhile){
				
				for(i=from;i<=to;i++){
					order[el.id][c] = i+''+parseInt(to2-i+1);
					c++;
				}
				
				to2++;
				
				if(to < n && to2 < m && n<m){
					to++;	
				}
				
				if(to < n && n>=m){
					to++;	
				}
				
				if(to2 > m){
					from++;
				}
				
				if(from > to) dowhile= false;
				
			}			

		}

		// straight effect
		jQuery.straight = function(el){
			counter = 0;
			for(i=1;i <= params[el.id].sph;i++){
				for(j=1; j <= params[el.id].spw; j++){	
					order[el.id][counter] = i+''+j;
					counter++;
				}
				
			}
		}

		jQuery.min = function(n,m){
			if (n>m) return m;
			else return n;
		}
		
		jQuery.max = function(n,m){
			if (n<m) return m;
			else return n;
		}		
	
	this.each (
		function(){ init(this); }
	);
	

	};
	
	
	// default values
	jQuery.fn.coinslider.defaults = {	
		width: 565, // width of slider panel
		height: 290, // height of slider panel
		spw: 7, // squares per width
		sph: 5, // squares per height
		delay: 3000, // delay between images in ms
		sDelay: 30, // delay beetwen squares in ms
		opacity: 0.7, // opacity of title and navigation
		titleSpeed: 500, // speed of title appereance in ms
		effect: '', // random, swirl, rain, straight
		navigation: true, // prev next and buttons
		links : true, // show images as links 
		hoverPause: true // pause on hover		
	};	
	
})(jQuery);
	