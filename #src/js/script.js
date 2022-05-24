$('select').each(function () {
  var $this = $(this),
    numberOfOptions = $(this).children('option').length;

  $this.addClass('select-hidden');
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');

  var $styledSelect = $this.next('div.select-styled');
  $styledSelect.text($this.children('option').eq(0).text());

  var $list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  var $listItems = $list.children('li');

  $styledSelect.click(function (e) {
    e.stopPropagation();
    $('div.select-styled.active').not(this).each(function () {
      $(this).removeClass('active').next('ul.select-options').hide();
    });
    $(this).toggleClass('active').next('ul.select-options').toggle();
  });

  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass('active');
    $this.val($(this).attr('rel'));
    $list.hide();
  });

  $(document).click(function () {
    $styledSelect.removeClass('active');
    $list.hide();
  });
  $('#delivery-filter').parent().addClass('delivery-filter');
});

// изменение количества товара в карточке

$(function () {

  (function quantityProducts() {
    var $quantityArrowMinus = $(".quantity-arrow-minus");
    var $quantityArrowPlus = $(".quantity-arrow-plus");
    var $quantityNum = $(".quantity-num");

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      if ($(this).next().val() > 1) {
        $(this).next().val(+$(this).next().val() - 1);
      }
      if ($(this).next().val() > 1) {
        $(this).removeClass('disabled');
      } else {
        $(this).addClass('disabled');
      }
    }

    function quantityPlus() {
      $(this).prev().val(+$(this).prev().val() + 1);
      $(this).prevAll('.quantity-arrow-minus').removeClass('disabled');
    }
  })();

});


// sidebar nav

$("body").on("click", ".catalog-parent-item", function () {
  $(this).parent().toggleClass('opened');
  $(this).next().slideToggle();
})

// search

$('.header__search input').on('input', function () {
  if ($(this).val().length > 0)
    $('.header__search__clean').show()
  else
    $('.header__search__clean').hide()
})

$("body").on("click", ".header__search__clean", function () {
  $('.header__search input').val('');
  $(this).hide();
})

$("body").on("click", ".hide-pass", function () {
  $(this).prevAll('input').attr('type', 'text');
  $('.show-pass').show();
  $(this).hide();
})

$("body").on("click", ".show-pass", function () {
  $(this).prevAll('input').attr('type', 'password');
  $('.hide-pass').show();
  $(this).hide();
})

$('input[type="checkbox"]').on('click', function () {
  var $this = $(this);
  $($this).parent('label').toggleClass('active');
});

$('.custom-radio [type="radio"]').on('click', function () {
  var $this = $(this);
  $($this).parent('label').addClass('active');
  $($this).parent('label').siblings().removeClass('active');
});


$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 175) {
    $('.header').addClass('sticky');
    $('.main-nav.opened').addClass('fixed');
  } else {
    $('.header').removeClass('sticky');
    $('.main-nav.opened').removeClass('fixed');
  }
});

// открытие брендов

$("body").on("click", ".btn-filter-brand", function () {
  $(this).next().toggleClass('active');
})

$(document).click(function (e) {
  var div = $(".brands-filter__list");
  var itemClick = $(".btn-filter-brand");
  if ((!div.is(e.target) && div.has(e.target).length === 0) && (!itemClick.is(e.target) && itemClick.has(e.target).length === 0)) {
    $(".brands-filter__list").removeClass('active');
  }
});

// mobile


if ($(window).width() < 992) {
  $('.header__catalog-lvl1 a').each(function () {
    $(this).next('.submenu').prev().addClass('not-click').attr('href', 'javascript:void(0);');
  })
  $("body").on("click", ".not-click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass('opened');
  })
  $("body").on("click", ".header__catalog-btn", function () {
    $(this).next().slideToggle();
    $(this).toggleClass('opened');
    $('body').toggleClass('overflow');
  })

  $("body").on("click", ".header__toggle-menu-mobile", function () {
    $('.main-nav').toggleClass('opened')
    $(this).toggleClass('active');
    if ($('.header').hasClass('sticky')) {
      $('.main-nav.opened').addClass('fixed');
    }
  })

}


if ($(window).width() < 480) {
  $("body").on("click", ".header__search input", function () {
    $('.header__search').addClass('active');
    $('.header__search__result').show()
  })

  $("body").on("click", ".close-mobile-button", function () {
    $('.header__search').removeClass('active');
    $('.header__search__result').hide()
  })

}

// cортировка мобильная


$("body").on("click", ".modal-close", function () {
  $('.filter-sort-mobile').hide();
  $('body').removeClass('overflow');
})

$("body").on("click", ".btn-filter-sort-mobile", function () {
  $('.filter-sort-mobile').show()
  $('body').addClass('overflow');
})


$("body").on("click", ".modal-close", function () {
  $('.filter__mobile').hide();
  $('body').removeClass('overflow');
})
$("body").on("click", ".btn-filter-open-mobile", function () {
  $('.filter__mobile').css('display','flex');
  $('body').addClass('overflow');
})

// filter fields

$('.filter-field input').on('input', function () {
  if ($(this).val().length > 0)
    $(this).next('.filter-field-clear').show()
  else
  $(this).next('.filter-field-clear').hide()
})

$("body").on("click", ".filter-field-clear", function () {
  $(this).prev().val('');
  $(this).hide();
})

