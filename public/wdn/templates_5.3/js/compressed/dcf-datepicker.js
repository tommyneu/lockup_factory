define(["exports","./dcf-utility"],function(t,e){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,a){return e&&i(t.prototype,e),a&&i(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}Object.defineProperty(t,"__esModule",{value:!0}),t.DCFDatepicker=void 0;var n=function(){function t(i){a(this,t),this.int0=e.DCFUtility.magicNumbers("int0"),this.int1=e.DCFUtility.magicNumbers("int1"),this.int2=e.DCFUtility.magicNumbers("int2"),this.int3=e.DCFUtility.magicNumbers("int3"),this.int6=e.DCFUtility.magicNumbers("int6"),this.int7=e.DCFUtility.magicNumbers("int7"),this.intMinus1=e.DCFUtility.magicNumbers("intMinus1"),this.datepicker=i,this.uuid=e.DCFUtility.uuidv4(),this.buttonLabelChoose="Choose Date",this.buttonLabelChange="Change Date",this.dayLabels=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],this.monthLabels=["January","February","March","April","May","June","July","August","September","October","November","December"],this.messageCursorKeys="Cursor keys can navigate&nbsp;dates",this.lastMessage="",this.lastRowNode=null,this.days=[],this.focusDay=new Date,this.selectedDay=new Date(this.int0,this.int0,this.int1),this.isMouseDownOnBackground=!1,this.textboxNode=this.datepicker.querySelector('input[type="text"]'),this.appendPickerContainer(),this.appendDialog(),this.init()}return s(t,[{key:"parseInt",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return parseInt(t,10)})},{key:"appendPickerContainer",value:function(){var t=document.createElement("div");t.classList.add("dcf-input-group"),t.append(this.textboxNode),this.buttonNode=document.createElement("button"),this.buttonNode.classList.add("dcf-btn","dcf-btn-primary","dcf-btn-datepicker"),this.buttonNode.setAttribute("aria-label","Choose Date"),this.buttonNode.innerHTML="&#128197;",t.appendChild(this.buttonNode),this.datepicker.append(t)}},{key:"appendDialog",value:function(){var t=this,e=this.uuid.concat("-dialog-label"),a=this.uuid.concat("-dialog-grid");this.dialogNode=document.createElement("div"),this.dialogNode.setAttribute("id",this.uuid.concat("-datepicker")),this.dialogNode.setAttribute("role","dialog"),this.dialogNode.setAttribute("aria-modal","true"),this.dialogNode.setAttribute("aria-labelledby",e),this.dialogNode.classList.add("dcf-datepicker-dialog","dcf-absolute","dcf-pin-right","dcf-invisible","dcf-d-none");var i=document.createElement("div");i.classList.add("dcf-datepicker-dialog-header","dcf-d-flex","dcf-ai-center","dcf-jc-around"),this.prevYearNode=document.createElement("button"),this.prevYearNode.classList.add("dcf-btn","dcf-btn-tertiary","dcf-datepicker-dialog-btn-header","dcf-datepicker-dialog-btn-prev-year"),this.prevYearNode.setAttribute("aria-label","previous year"),this.prevYearNode.innerHTML="&laquo;",i.append(this.prevYearNode),this.prevMonthNode=document.createElement("button"),this.prevMonthNode.classList.add("dcf-btn","dcf-btn-tertiary","dcf-datepicker-dialog-btn-header","dcf-datepicker-dialog-btn-prev-month"),this.prevMonthNode.setAttribute("aria-label","previous month"),this.prevMonthNode.innerHTML="&lsaquo;",i.append(this.prevMonthNode),this.monthYearNode=document.createElement("h2"),this.monthYearNode.classList.add("dcf-datepicker-dialog-month-year","dcf-flex-grow-1","dcf-mb-0","dcf-txt-center"),this.monthYearNode.setAttribute("id",e),this.monthYearNode.setAttribute("aria-live","polite"),i.append(this.monthYearNode),this.nextMonthNode=document.createElement("button"),this.nextMonthNode.classList.add("dcf-btn","dcf-btn-tertiary","dcf-datepicker-dialog-btn-header","dcf-datepicker-dialog-btn-next-month"),this.nextMonthNode.setAttribute("aria-label","next month"),this.nextMonthNode.innerHTML="&rsaquo;",i.append(this.nextMonthNode),this.nextYearNode=document.createElement("button"),this.nextYearNode.classList.add("dcf-btn","dcf-btn-tertiary","dcf-datepicker-dialog-btn-header","dcf-datepicker-dialog-btn-next-year"),this.nextYearNode.setAttribute("aria-label","next year"),this.nextYearNode.innerHTML="&raquo;",i.append(this.nextYearNode);var s=document.createElement("table");s.classList.add("dcf-datepicker-dialog-calendar","dcf-w-100%","dcf-table-fixed"),s.setAttribute("id",a),s.setAttribute("role","grid"),s.setAttribute("aria-labelledby",e);var n=document.createElement("thead"),o=document.createElement("tr");Array.prototype.forEach.call(this.dayLabels,function(e){var a=document.createElement("th");a.setAttribute("scope","col"),a.setAttribute("abbr",e),a.innerText=e.substring(t.int0,t.int2),o.append(a)}),n.append(o),s.append(n),this.tbodyNode=document.createElement("tbody"),s.append(this.tbodyNode);var d=document.createElement("div");d.classList.add("dcf-datepicker-dialog-ok-cancel-group","dcf-flex-shrink-0","dcf-mr-4"),this.okButtonNode=document.createElement("button"),this.okButtonNode.classList.add("dcf-btn","dcf-btn-primary","dcf-datepicker-dialog-btn-footer","dcf-datepicker-dialog-btn-ok","dcf-mr-3"),this.okButtonNode.setAttribute("value","ok"),this.okButtonNode.innerText="OK",d.append(this.okButtonNode),this.cancelButtonNode=document.createElement("button"),this.cancelButtonNode=document.createElement("button"),this.cancelButtonNode.classList.add("dcf-btn","dcf-btn-tertiary","dcf-datepicker-dialog-btn-footer","dcf-datepicker-dialog-btn-cancel"),this.cancelButtonNode.setAttribute("value","cancel"),this.cancelButtonNode.innerText="Cancel",d.append(this.cancelButtonNode),this.messageNode=document.createElement("div"),this.messageNode.classList.add("dcf-datepicker-dialog-message","dcf-d-flex","dcf-ai-center","dcf-jc-center"),this.messageNode.setAttribute("aria-live","polite");var c=document.createElement("div");c.classList.add("dcf-datepicker-dialog-footer","dcf-d-flex","dcf-flex-nowrap","dcf-ai-center","dcf-mt-1"),c.append(d),c.append(this.messageNode),this.dialogNode.append(i),this.dialogNode.append(s),this.dialogNode.append(c),this.datepicker.appendChild(this.dialogNode)}},{key:"init",value:function(){var t=this;this.textboxNode.addEventListener("blur",this.setDateForButtonLabel()),this.buttonNode.addEventListener("keydown",function(e){t.handleButtonKeydown(e)}),this.buttonNode.addEventListener("click",function(e){t.handleButtonClick(e)}),this.okButtonNode.addEventListener("click",function(e){t.handleOkButton(e)}),this.okButtonNode.addEventListener("keydown",function(e){t.handleOkButton(e)}),this.cancelButtonNode.addEventListener("click",function(e){t.handleCancelButton(e)}),this.cancelButtonNode.addEventListener("keydown",function(e){t.handleCancelButton(e)}),this.prevMonthNode.addEventListener("click",function(e){t.handlePreviousMonthButton(e)}),this.nextMonthNode.addEventListener("click",function(e){t.handleNextMonthButton(e)}),this.prevYearNode.addEventListener("click",function(e){t.handlePreviousYearButton(e)}),this.nextYearNode.addEventListener("click",function(e){t.handleNextYearButton(e)}),this.prevMonthNode.addEventListener("keydown",function(e){t.handlePreviousMonthButton(e)}),this.nextMonthNode.addEventListener("keydown",function(e){t.handleNextMonthButton(e)}),this.prevYearNode.addEventListener("keydown",function(e){t.handlePreviousYearButton(e)}),this.nextYearNode.addEventListener("keydown",function(e){t.handleNextYearButton(e)}),document.body.addEventListener("mouseup",function(e){t.handleBackgroundMouseUp(e)},!0),this.tbodyNode.innerHTML="";for(var e=0;e<this.int6;e++){var a=this.tbodyNode.insertRow(e);this.lastRowNode=a;for(var i=0;i<this.int7;i++){var s=document.createElement("td");s.tabIndex=this.intMinus1,s.addEventListener("click",this.handleDayClick.bind(this)),s.addEventListener("keydown",this.handleDayKeyDown.bind(this)),s.addEventListener("focus",this.handleDayFocus.bind(this)),s.textContent="-1",a.appendChild(s),this.days.push(s)}}this.updateGrid(),this.close(!1),this.setDateForButtonLabel()}},{key:"isSameDay",value:function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}},{key:"isNotSameMonth",value:function(t,e){return t.getFullYear()!==e.getFullYear()||t.getMonth()!==e.getMonth()}},{key:"updateGrid",value:function(){var t=!1,e=this.focusDay;this.monthYearNode.textContent="".concat(this.monthLabels[e.getMonth()]," ").concat(e.getFullYear());var a=new Date(e.getFullYear(),e.getMonth(),this.int1),i=a.getDay();a.setDate(a.getDate()-i);for(var s=new Date(a),n=0;n<this.days.length;n++){t=s.getMonth()!==e.getMonth(),this.updateDate(this.days[n],t,s,this.isSameDay(s,this.selectedDay)),s.setDate(s.getDate()+this.int1);35===n&&(this.lastRowNode.style.visibility=t?"hidden":"visible")}}},{key:"updateDate",value:function(t,e,a,i){var s=a.getDate().toString();a.getDate()<=9&&(s="0".concat(s));var n=a.getMonth()+this.int1;a.getMonth()<9&&(n="0".concat(n)),t.tabIndex=this.intMinus1,t.removeAttribute("aria-selected"),t.setAttribute("data-date","".concat(a.getFullYear(),"-").concat(n,"-").concat(s)),e?(t.classList.add("disabled"),t.textContent=""):(t.classList.remove("disabled"),t.textContent=a.getDate(),i&&(t.setAttribute("aria-selected","true"),t.tabIndex=this.int0))}},{key:"moveFocusToDay",value:function(t){var e=this.focusDay;this.focusDay=t,e.getMonth()===this.focusDay.getMonth()&&e.getYear()===this.focusDay.getYear()||this.updateGrid(),this.setFocusDay()}},{key:"setFocusDay",value:function(t){var e=t;"boolean"!=typeof e&&(e=!0);for(var a=0;a<this.days.length;a++){var i=this.days[a],s=this.getDayFromDataDateAttribute(i);i.tabIndex=this.intMinus1,this.isSameDay(s,this.focusDay)&&(i.tabIndex=this.int0,e&&i.focus())}}},{key:"open",value:function(){this.dialogNode.setAttribute("aria-hidden","false"),this.dialogNode.classList.remove("dcf-opacity-0","dcf-invisible","dcf-d-none"),this.dialogNode.classList.add("dcf-datepicker-dialog-is-open","dcf-opacity-100"),this.getDateFromTextbox(),this.updateGrid()}},{key:"isOpen",value:function(){return this.dialogNode.classList.contains("dcf-datepicker-dialog-is-open")}},{key:"close",value:function(t){var e=this,a=t;"boolean"!=typeof a&&(a=!0),this.setMessage(""),this.dialogNode.setAttribute("aria-hidden","true"),this.dialogNode.classList.remove("dcf-datepicker-dialog-is-open","dcf-opacity-100"),this.dialogNode.classList.add("dcf-opacity-0");var i=function t(){e.dialogNode.removeEventListener("transitionend",t),e.isOpen()||e.dialogNode.classList.contains("dcf-invisible")||e.dialogNode.classList.add("dcf-invisible","dcf-d-none")};this.dialogNode.addEventListener("transitionend",i),a&&this.buttonNode.focus()}},{key:"moveToNextYear",value:function(){this.focusDay.setFullYear(this.focusDay.getFullYear()+this.int1),this.updateGrid()}},{key:"moveToPreviousYear",value:function(){this.focusDay.setFullYear(this.focusDay.getFullYear()-this.int1),this.updateGrid()}},{key:"moveToNextMonth",value:function(){this.focusDay.setMonth(this.focusDay.getMonth()+this.int1),this.updateGrid()}},{key:"moveToPreviousMonth",value:function(){this.focusDay.setMonth(this.focusDay.getMonth()-this.int1),this.updateGrid()}},{key:"moveFocusToNextDay",value:function(){var t=new Date(this.focusDay);t.setDate(t.getDate()+this.int1),this.moveFocusToDay(t)}},{key:"moveFocusToNextWeek",value:function(){var t=new Date(this.focusDay);t.setDate(t.getDate()+this.int7),this.moveFocusToDay(t)}},{key:"moveFocusToPreviousDay",value:function(){var t=new Date(this.focusDay);t.setDate(t.getDate()-this.int1),this.moveFocusToDay(t)}},{key:"moveFocusToPreviousWeek",value:function(){var t=new Date(this.focusDay);t.setDate(t.getDate()-this.int7),this.moveFocusToDay(t)}},{key:"moveFocusToFirstDayOfWeek",value:function(){var t=new Date(this.focusDay);t.setDate(t.getDate()-t.getDay()),this.moveFocusToDay(t)}},{key:"moveFocusToLastDayOfWeek",value:function(){var t=new Date(this.focusDay);t.setDate(t.getDate()+(this.int6-t.getDay())),this.moveFocusToDay(t)}},{key:"isDayDisabled",value:function(t){return t.classList.contains("disabled")}},{key:"getDayFromDataDateAttribute",value:function(t){var e=t.getAttribute("data-date").split("-");return new Date(e[this.int0],this.parseInt(e[this.int1])-this.int1,e[this.int2])}},{key:"setTextboxDate",value:function(t){var e=this.focusDay;t&&(e=this.getDayFromDataDateAttribute(t),this.days.forEach(function(e){e===t?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected")})),this.textboxNode.value="".concat(e.getMonth()+this.int1,"/").concat(e.getDate(),"/").concat(e.getFullYear());var a=new Event("change");this.textboxNode.dispatchEvent(a),this.setDateForButtonLabel()}},{key:"getDateFromTextbox",value:function(){var t=this.textboxNode.value.split("/"),e=this.parseInt(t[this.int0]),a=this.parseInt(t[this.int1]),i=this.parseInt(t[this.int2]);if(t.length===this.int3&&Number.isInteger(e)&&Number.isInteger(a)&&Number.isInteger(i)){i<100&&(i=2e3+i),this.focusDay=new Date(i,e-this.int1,a),this.selectedDay=new Date(this.focusDay)}else this.focusDay=new Date,this.selectedDay=new Date(this.int0,this.int0,this.int1)}},{key:"setDateForButtonLabel",value:function(){var t=this.textboxNode.value.split("/");if(t.length===this.int3&&Number.isInteger(this.parseInt(t[this.int0]))&&Number.isInteger(this.parseInt(t[this.int1]))&&Number.isInteger(this.parseInt(t[this.int2]))){var e=new Date(this.parseInt(t[this.int2]),this.parseInt(t[this.int0])-this.int1,this.parseInt(t[this.int1])),a="".concat(this.monthLabels[e.getMonth()]," ").concat(e.getDate(),", ").concat(e.getFullYear()),i="".concat(this.buttonLabelChange,", ").concat(this.dayLabels[e.getDay()]," ").concat(a);this.buttonNode.setAttribute("aria-label",i)}else this.buttonNode.setAttribute("aria-label",this.buttonLabelChoose)}},{key:"setMessage",value:function(t){var e=this;if(t!==this.lastMessage){setTimeout(function(){e.messageNode.innerHTML=t}(),200),this.lastMessage=t}}},{key:"handleOkButton",value:function(t){var e=!1;switch(t.type){case"keydown":switch(t.key){case"Tab":t.shiftKey||(this.prevYearNode.focus(),e=!0);break;case"Esc":case"Escape":this.close(),e=!0;break;default:e=!1}break;case"click":this.setTextboxDate(),this.close(),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handleCancelButton",value:function(t){var e=!1;switch(t.type){case"keydown":switch(t.key){case"Esc":case"Escape":this.close(),e=!0;break;default:e=!1}break;case"click":this.close(),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handleNextYearButton",value:function(t){var e=!1;switch(t.type){case"keydown":switch(t.key){case"Esc":case"Escape":this.close(),e=!0;break;case"Enter":this.moveToNextYear(),this.setFocusDay(!1),e=!0;break;default:e=!1}break;case"click":this.moveToNextYear(),this.setFocusDay(!1),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handlePreviousYearButton",value:function(t){var e=!1;switch(t.type){case"keydown":switch(t.key){case"Enter":this.moveToPreviousYear(),this.setFocusDay(!1),e=!0;break;case"Tab":t.shiftKey&&(this.okButtonNode.focus(),e=!0);break;case"Esc":case"Escape":this.close(),e=!0;break;default:e=!1}break;case"click":this.moveToPreviousYear(),this.setFocusDay(!1),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handleNextMonthButton",value:function(t){var e=!1;switch(t.type){case"keydown":switch(t.key){case"Esc":case"Escape":this.close(),e=!0;break;case"Enter":this.moveToNextMonth(),this.setFocusDay(!1),e=!0;break;default:e=!1}break;case"click":this.moveToNextMonth(),this.setFocusDay(!1),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handlePreviousMonthButton",value:function(t){var e=!1;switch(t.type){case"keydown":switch(t.key){case"Esc":case"Escape":this.close(),e=!0;break;case"Enter":this.moveToPreviousMonth(),this.setFocusDay(!1),e=!0;break;default:e=!1}break;case"click":this.moveToPreviousMonth(),this.setFocusDay(!1),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handleDayKeyDown",value:function(t){var e=!1;switch(t.key){case"Esc":case"Escape":this.close();break;case" ":this.setTextboxDate(t.currentTarget),e=!0;break;case"Enter":this.setTextboxDate(t.currentTarget),this.close(),e=!0;break;case"Tab":this.cancelButtonNode.focus(),t.shiftKey&&this.nextYearNode.focus(),this.setMessage(""),e=!0;break;case"Right":case"ArrowRight":this.moveFocusToNextDay(),e=!0;break;case"Left":case"ArrowLeft":this.moveFocusToPreviousDay(),e=!0;break;case"Down":case"ArrowDown":this.moveFocusToNextWeek(),e=!0;break;case"Up":case"ArrowUp":this.moveFocusToPreviousWeek(),e=!0;break;case"PageUp":t.shiftKey?this.moveToPreviousYear():this.moveToPreviousMonth(),this.setFocusDay(),e=!0;break;case"PageDown":t.shiftKey?this.moveToNextYear():this.moveToNextMonth(),this.setFocusDay(),e=!0;break;case"Home":this.moveFocusToFirstDayOfWeek(),e=!0;break;case"End":this.moveFocusToLastDayOfWeek(),e=!0;break;default:e=!1}e&&(t.stopPropagation(),t.preventDefault())}},{key:"handleDayClick",value:function(t){this.isDayDisabled(t.currentTarget)||(this.setTextboxDate(t.currentTarget),this.close()),t.stopPropagation(),t.preventDefault()}},{key:"handleDayFocus",value:function(){this.setMessage(this.messageCursorKeys)}},{key:"handleButtonKeydown",value:function(t){"Enter"!==t.key&&" "!==t.key||(this.open(),this.setFocusDay(),t.stopPropagation(),t.preventDefault())}},{key:"handleButtonClick",value:function(t){this.isOpen()?this.close():(this.open(),this.setFocusDay()),t.stopPropagation(),t.preventDefault()}},{key:"handleBackgroundMouseUp",value:function(t){this.buttonNode.contains(t.target)||this.dialogNode.contains(t.target)||this.isOpen()&&(this.close(!1),t.stopPropagation(),t.preventDefault())}}]),t}();t.DCFDatepicker=n});
//# sourceMappingURL=dcf-datepicker.js.map