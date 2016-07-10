/*
 * jSwipe - jQuery Plugin
 * http://plugins.jquery.com/project/swipe
 * http://www.ryanscherf.com/demos/swipe/
 *
 * Copyright (c) 2009 Ryan Scherf (www.ryanscherf.com)
 * Licensed under the MIT license
 *
 * $Date: 2009-07-14 (Tue, 14 Jul 2009) $
 * $version: 0.1.2
 * 
 * This jQuery plugin will only run on devices running Mobile Safari
 * on iPhone or iPod Touch devices running iPhone OS 2.0 or later. 
 * http://developer.apple.com/iphone/library/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW5
 */
(function($) {
	$.fn.multiswipe = function(options) {
		
		// Default swipe functions
		var defaults = {
			swipestyle: 0
		};
		
		var options = $.extend(defaults, options);
		
	
		if (!this) return false;
		
		return this.each(function() {
			
			var me = $(this);
			
			// Private variables for each element
			var originalCoord = { x: 0, y: 0 };
			var finalScale = 0;
			
			// Swipe was started
			function touchStart(event) {
				//console.log('Starting swipe gesture...'+ event.targetTouches.length);
				
				originalCoord.x = event.targetTouches[0].pageX;
				originalCoord.y = event.targetTouches[0].pageY;

			}

			// Store coordinates as finger is swiping
			function touchMove(event) {
			    	event.preventDefault();
			        if (options.swipestyle == 0)
			        	{
					curX = me.scrollLeft() + originalCoord.x - event.targetTouches[0].pageX; 
					curY = me.scrollTop() + originalCoord.y - event.targetTouches[0].pageY; 

					me.scrollLeft(curX);
					me.scrollTop(curY);

			        	}
			        if (options.swipestyle == 1)
			        	{
			        	curX = originalCoord.x - event.targetTouches[0].pageX; 
					curY = originalCoord.y - event.targetTouches[0].pageY;
			        	map.pan(curX, curY);

			        	}

				
			}
			
			// Done Swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd(event) {
				//console.log('Ending swipe gesture...'+event.targetTouches.length);

			}
			
			// gestureStart
			function gestureStart(event) { 
				//console.log('gestureStart...');
			}
			// gestureChange
			function gestureChange(event) { 
				//console.log('gestureChange...'+ event.scale);
				event.preventDefault(); 
				
				if (options.swipestyle == 0)
					{

					this.style.webkitTransform = 'scale(' + event.scale   + ')'; 
					this.style.height = (1/event.scale)*100 + '%'; 
					this.style.width = (1/event.scale)*100 + '%'; 
					}
				if (options.swipestyle == 1)
					{
					
					
					if (event.scale > 0)
						{map.zoomIn()}
					if (event.scale < 0)
						{map.zoomOut()}
					
					}


			}
			// gestureEnd
			function gestureEnd(event) { 
				//console.log('gestureEnd...' + finalScale);
				
			}
			
			
			// Swipe was canceled
			function touchCancel(event) { 
				//console.log('Canceling swipe gesture...');
			}
			
			// Add gestures to all swipable areas
			 if ( !$.browser.msie ) {

				this.addEventListener("touchstart", touchStart, false);
				//this.addEventListener("mousemove", touchMove, false);
				this.addEventListener("touchmove", touchMove, false);
				this.addEventListener("touchend", touchEnd, false);
				this.addEventListener("touchcancel", touchCancel, false);
				
				this.addEventListener("gesturestart", gestureStart, false); 
				this.addEventListener("gesturechange", gestureChange, false); 
				this.addEventListener("gestureend", gestureEnd, false); 
				

			}

				
		});
	};
})(jQuery);
