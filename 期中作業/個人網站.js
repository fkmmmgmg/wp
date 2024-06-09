!function($){

    "use strict";
    var Typed = function(e1,option){

        this.e1 = $(el);

        this.option = $.extend(
            {},$.fn.typed.defaults,options);

        this.baseText = this.el.text() || this.el.attr('placeholder') || '';

        this.typeSpeed =this.option.typeSpeed;

        this.startDelay = this.options.startDelay;

        this.baseSpeed = this.options.backSpeed;
        
    }
}