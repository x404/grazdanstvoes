 jQuery(document).ready(function () {
	jQuery(document).keydown(function(e) {
		if (e.keyCode === 27) {
			jQuery('.fc_close, .close, .fc_close2').click()
		}
	})

	jQuery('#order_form .btn').click(function(){
		$('#order_form').submit();
	});

	var thank = '<div class="thank text-center"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button> <h4>Сообщение отправлено!</h4> </div>';
	var errorTxt = 'Возникла ошибка при отправке заявки!';
	jQuery('#modal-1-form').validate({
		submitHandler: function(form){
			strSubmit=jQuery(form).serialize();
			jQuery.ajax({type: "POST",url: "/order.ajax.php",data: strSubmit,
				success: function(){
					jQuery('#modal-1-form').closest('.fc-form-modal').removeClass('fc_in');
					jQuery('#modal-1-form').find('input[type="text"]').val("");
					setTimeout(function() { 
						jQuery('body').append(thank);
						startClock('modal-1')
					}, 200);
				}
			}).fail(function(error){alert(errorTxt)});
		}
	});


	jQuery('#modal-2-form').validate({
		submitHandler: function(form){
			strSubmit=jQuery(form).serialize();
			jQuery.ajax({type: "POST",url: "/order.ajax.php",data: strSubmit,
				success: function(){
					jQuery('#modal-2-form').closest('.fc-form-modal').removeClass('fc_in');
					jQuery('#modal-2-form').find('input[type="text"]').val("");
					setTimeout(function() { 
						jQuery('.fc-form-1').append(thank);
						startClock('modal-2')
					}, 200);
				}
			}).fail(function(error){alert(errorTxt)});
		}
	});	


	jQuery('#modal-3-form').validate({
		submitHandler: function(form){
			strSubmit=jQuery(form).serialize();
			jQuery.ajax({type: "POST",url: "/order.ajax.php",data: strSubmit,
				success: function(){
					jQuery('#modal-3-form').closest('.fc-form-modal').removeClass('fc_in');
					jQuery('#modal-3-form').find('input[type="text"], input[type="email"], textarea').val("");
					setTimeout(function() { 
						jQuery('.fc-form-2').append(thank);
						startClock('modal-3')
					}, 200);
				}
			}).fail(function(error){alert(errorTxt)});
		}
	});



	jQuery('[data-toggle="fc_modal"]').click(function(){
		jQuery('body').addClass('fc_modal-open').append('<div class="fc_modal-backdrop fc_fade fc_in"></div>');
		let $this = jQuery(this),
			id = $this.data('target');
			title = $this.data('title');

		jQuery('#' + id).find('input[name="theme"]').val(title);
		jQuery('#' + id).fadeIn('normal', function(){
			jQuery('#' + id).addClass('fc_in').show();
		});
	})


	jQuery('body').on('click focus touchstart', '.fc_close, .close', function() {		
		var identifier = jQuery(this).closest('.fc-form-modal').attr('id')
		jQuery('.fc_modal-backdrop').removeClass('fc_in');
		jQuery('#' + identifier).removeClass('fc_in');
		setTimeout(function() { 
			jQuery('.fc_modal-backdrop').remove();
			jQuery('body').removeClass('fc_modal-open');
			jQuery('#' + identifier).hide();
			jQuery('.thank').fadeOut('normal', function(){
				jQuery('.thank').remove();
			})
		}, 200);

	})

	jQuery('body').on('click', '.fc_modal-backdrop', function() {
		jQuery('.fc_close, .close, .fc_close2').click()
	})


	// jQuery('body').on('click focus touchstart', '.fc_close2', function() {
	// 	var id = jQuery(this).parents('.fc_modal').attr('id')
	// 	jQuery('#' + id).removeClass('fc_in')
	// 	jQuery('.fc_modal-backdrop').removeClass('fc_in')
	// 	setTimeout(function() { jQuery('#' + id).fc_modal('hide'); }, 200);
	// })

	// jQuery('body').on('click', '.fc_close2, .fc_modal-backdrop', function() {
	// 	var id = jQuery(this).parents('.fc_modal').attr('id')
	// 	jQuery('#' + id).removeClass('fc_in')
	// 	jQuery('.fc_modal-backdrop').removeClass('fc_in')
	// 	setTimeout(function() { jQuery('#' + id).fc_modal('hide'); }, 200)
	// });

});


var timer;
var sec = 3;

function showTime(form){
	sec = sec-1;
	if (sec <=0) {
		stopClock();
		jQuery('.thank').fadeOut('normal',function(){
			// this.remove();
			jQuery('.fc_close, .close, .fc_close2').click()
		});
	}
}

function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(form){
	if (!timer)
	timer = window.setInterval("showTime('"+form+"')",1000);
}




/*

+function ($) {
 	 'use strict'

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
  	  var el = document.createElement('bootstrap')

  	  var transEndEventNames = {
  		  'WebkitTransition' : 'webkitTransitionEnd',
  		  'MozTransition'    : 'transitionend',
  		  'OTransition'      : 'oTransitionEnd otransitionend',
  		  'transition'       : 'transitionend'
  	}

  	  for (var name in transEndEventNames) {
  		  if (el.style[name] !== undefined) {
  			  return { end: transEndEventNames[name] }
  		}
  	}

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
  	  var called = false, $el = this
  	  $(this).one($.support.transition.end, function () { called = true })
  	  var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
  	  setTimeout(callback, duration)
  	  return this
  }

  $(function () {
  	  $.support.transition = transitionEnd()
  })

}(jQuery);

+function(a) {'use strict'; var b = function(b, c) { this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote) }; b.DEFAULTS = { backdrop:!0, keyboard:!0, show:!0 }, b.prototype.toggle = function(a) { return this[this.isShown?'hide':'show'](a) }, b.prototype.show = function(b) { var c = this, d = a.Event('show.bs.fc_modal', { relatedTarget:b }); this.$element.trigger(d); if (this.isShown || d.isDefaultPrevented()) return; this.isShown = !0, this.escape(), this.$element.on('click.dismiss.fc_modal', '[data-dismiss="fc_modal"]', a.proxy(this.hide, this)), this.backdrop(function() { var d = a.support.transition && c.$element.hasClass('fc_fade'); c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass('fc_in').attr('aria-hidden', !1), c.enforceFocus(); var e = a.Event('shown.bs.fc_modal', { relatedTarget:b }); d ? c.$element.find('.fc_modal-dialog').one(a.support.transition.end, function() { c.$element.focus().trigger(e) }).emulateTransitionEnd(300):c.$element.focus().trigger(e) }) }, b.prototype.hide = function(b) { b && b.preventDefault(), b = a.Event('hide.bs.fc_modal'), this.$element.trigger(b); if (!this.isShown || b.isDefaultPrevented()) return; this.isShown = !1, this.escape(), a(document).off('focusin.bs.fc_modal'), this.$element.removeClass('fc_in').attr('aria-hidden', !0).off('click.dismiss.fc_modal'), a.support.transition && this.$element.hasClass('fc_fade') ? this.$element.one(a.support.transition.end, a.proxy(this.hidefc_modal, this)).emulateTransitionEnd(300):this.hidefc_modal() }, b.prototype.enforceFocus = function() { a(document).off('focusin.bs.fc_modal').on('focusin.bs.fc_modal', a.proxy(function(a) { this.$element[0] !== a.target && !this.$element.has(a.target).length && this.$element.focus() }, this)) }, b.prototype.escape = function() { this.isShown && this.options.keyboard ? this.$element.on('keyup.dismiss.bs.fc_modal', a.proxy(function(a) { a.which == 2712 && this.hide() }, this)):this.isShown || this.$element.off('keyup.dismiss.bs.fc_modal') }, b.prototype.hidefc_modal = function() { var a = this; this.$element.hide(), this.backdrop(function() { a.removeBackdrop(), a.$element.trigger('hidden.bs.fc_modal') }) }, b.prototype.removeBackdrop = function() { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, b.prototype.backdrop = function(b) { var c = this, d = this.$element.hasClass('fc_fade')?'fc_fade':''; if (this.isShown && this.options.backdrop) { var e = a.support.transition && d; this.$backdrop = a('<div class="fc_modal-backdrop ' + d + '" />').appendTo(document.body), this.$element.on('click.dismiss.fc_modal', a.proxy(function(a) { if (a.target !== a.currentTarget) return; this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]):this.hide.call(this) }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass('fc_in'); if (!b) return; e ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150):b() } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass('fc_in'), a.support.transition && this.$element.hasClass('fc_fade') ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150):b()):b && b() }; var c = a.fn.fc_modal; a.fn.fc_modal = function(c, d) { return this.each(function() { var e = a(this), f = e.data('bs.fc_modal'), g = a.extend({}, b.DEFAULTS, e.data(), typeof c == "object" && c); f || e.data('bs.fc_modal', f = new b(this, g)), typeof c == "string" ? f[c](d):g.show && f.show(d) }) }, a.fn.fc_modal.Constructor = b, a.fn.fc_modal.noConflict = function() { return a.fn.fc_modal = c, this }, a(document).on('click.bs.fc_modal.data-api', '[data-toggle="fc_modal"]', function(b) { var c = a(this), d = c.attr('href'), e = a(c.attr('data-target') || d && d.replace(/.*(?=#[^\s]+$)/,'')), f = e.data('fc_modal')?'toggle':a.extend({ remote:!/#/.test(d) && d }, e.data(), c.data()); b.preventDefault(), e.fc_modal(f, this).one('hide', function() { c.is(':visible') && c.focus() }) }), a(document).on('show.bs.fc_modal','.fc_modal', function() { a(document.body).addClass('fc_modal-open') }).on('hidden.bs.fc_modal','.fc_modal', function() { a(document.body).removeClass('fc_modal-open') }) }(window.jQuery)

*/