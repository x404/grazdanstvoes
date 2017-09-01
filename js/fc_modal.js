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
						// startClock('modal-2')
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
});


var timer;
var sec = 3;

function showTime(form){
	sec = sec-1;
	if (sec <=0) {
		stopClock();
		jQuery('.thank').fadeOut('normal',function(){
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