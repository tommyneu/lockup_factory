<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* wdn/templates_5.3/scss/deprecated/deprecated.text.scss */
class __TwigTemplate_0d5502a78e3a2fc387a527f0c4e70b7f extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "wdn/templates_5.3/scss/deprecated/deprecated.text.scss"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "wdn/templates_5.3/scss/deprecated/deprecated.text.scss"));

        // line 1
        echo "////////////////////////////
// THEME / DEPRECATED / TEXT
////////////////////////////


// Prepend deprecated headings with '.unl ' to ensure styles override 5.3 theme heading styles.
.unl .wdn-brand {
  font-weight: 400;
}

.unl .wdn-brand-caps {
  font-weight: 400;
  text-transform: uppercase;
}

.unl .wdn-sans-caps {
  letter-spacing: .02em;
  line-height: 1.333;
  text-transform: uppercase;
}

.unl .wdn-alt-header {
  @include txt-base;
  letter-spacing: .02em;
  line-height: 1.333;
  text-transform: uppercase;
}

.unl .wdn-list-header {
  @include bb-1;
  border-color: var(--b);
  @include txt-base;
  letter-spacing: .02em;
  line-height: 1.333;
  @include pb-1;
  @include pt-4;
  text-transform: uppercase;
}

.unl .wdn-subhead {
  display: block;
  font-size: #{ms(-2)}rem; // .75rem
  font-weight: normal;
  @include ls-2;
  @include mb-3;
  text-transform: uppercase;
}

.unl p,
.unl span,
.unl div,
.unl ul,
.unl li,
.unl section,
.unl img {

  + h1,
  + h2,
  + h3,
  + h4,
  + h5,
  + h6 {
    margin-top: 1em;
  }
}

.unl h1,
.unl h2,
.unl h3 {

  > .wdn-subhead,
  + .wdn-subhead {
    font-size: 1rem;
  }
}

.unl h4,
.unl h5,
.unl h6 {

  > .wdn-subhead,
  + .wdn-subhead {
    font-size: .75rem;
  }
}

.wdn-subhead {

  + h1,
  + h2,
  + h3,
  + h4,
  + h5,
  + h6 {
    margin-top: 0;
  }
}

.unl p,
.unl span,
.unl div,
.unl ul,
.unl li,
.unl section,
.unl img {

  + .wdn-subhead {
    margin-bottom: 0;
  }
}

.wdn-list-reset {
  list-style: none;
  padding-left: 0;
}

.wdn-intro-p {
  @include txt-lg;
}

.unl p.small {
  @include txt-xs;
}

// ICON FONT - see /wdn/templates_4.1/fonts/fontello/readme.md
@font-face {
  font-family: 'wdn-icon';
  font-style: normal;
  font-weight: normal;
  src: url('../fonts/fontello/wdn-icon.woff2?92731841') format('woff2'),
       url('../fonts/fontello/wdn-icon.woff?92731841') format('woff');
}

[class^=\"wdn-icon-\"]::before,
[class*=\" wdn-icon-\"]::before {
  display: inline-block;
  font-family: 'wdn-icon';
  font-style: normal;
  font-variant: normal; // For safety - reset parent styles, that can break glyph codes
  font-weight: normal;
  margin-right: .2em;
  speak: none;
  text-align: center;
  text-decoration: inherit;
  text-transform: none; // For safety - reset parent styles, that can break glyph codes
  width: 1em;
}

.wdn-icon-mail::before { content: '\\2709'; } /* '✉' */
.wdn-icon-location::before { content: '\\e07a'; } /* '' */
.wdn-icon-user::before { content: '\\e800'; } /* '' */
.wdn-icon-snapchat::before { content: '\\e801'; } /* '' */
.wdn-icon-search::before { content: '\\e802'; } /* '' */
.wdn-icon-comment::before { content: '\\e803'; } /* '' */
.wdn-icon-comment-alt::before { content: '\\e804'; } /* '' */
.wdn-icon-cancel::before { content: '\\e805'; } /* '' */
.wdn-icon-attention::before { content: '\\e806'; } /* '' */
.wdn-icon-info::before { content: '\\e807'; } /* '' */
.wdn-icon-angle-double-right::before { content: '\\e808'; } /* '' */
.wdn-icon-star-circled::before { content: '\\e809'; } /* '' */
.wdn-icon-angle-double-left::before { content: '\\e80a'; } /* '' */
.wdn-icon-ok::before { content: '\\e80b'; } /* '' */
.wdn-icon-plus::before { content: '\\e80c'; } /* '' */
.wdn-icon-minus::before { content: '\\e80d'; } /* '' */
.wdn-icon-key::before { content: '\\e80e'; } /* '' */
.wdn-icon-up-small::before { content: '\\e80f'; } /* '' */
.wdn-icon-calendar-empty::before { content: '\\e810'; } /* '' */
.wdn-icon-rss-squared::before { content: '\\e811'; } /* '' */
.wdn-icon-calendar::before { content: '\\e812'; } /* '' */
.wdn-icon-youtube-play::before { content: '\\e813'; } /* '' */
.wdn-icon-linkedin-squared::before { content: '\\e814'; } /* '' */
.wdn-icon-instagram::before { content: '\\e815'; } /* '' */
.wdn-icon-flickr::before { content: '\\e816'; } /* '' */
.wdn-icon-vimeo::before { content: '\\e817'; } /* '' */
.wdn-icon-pinterest::before { content: '\\e818'; } /* '' */
.wdn-icon-tumblr::before { content: '\\e819'; } /* '' */
.wdn-icon-foursquare::before { content: '\\e81a'; } /* '' */
.wdn-icon-gplus::before { content: '\\e81b'; } /* '' */
.wdn-icon-share::before { content: '\\e81c'; } /* '' */
.wdn-icon-twitter::before { content: '\\e81d'; } /* '' */
.wdn-icon-facebook::before { content: '\\e81e'; } /* '' */
.wdn-icon-link::before { content: '\\e81f'; } /* '' */
.wdn-icon-blogger::before { content: '\\e820'; } /* '' */
.wdn-icon-play-circled::before { content: '\\e821'; } /* '' */
.wdn-icon-map::before { content: '\\e822'; } /* '' */
.wdn-icon-clock::before { content: '\\e823'; } /* '' */
.wdn-icon-rocket::before { content: '\\e825'; } /* '' */
.wdn-icon-pause::before { content: '\\e82a'; } /* '' */
.wdn-icon-print::before { content: '\\e901'; } /* '' */
.wdn-icon-phone::before { content: '\\e902'; } /* '' */
.wdn-icon-home::before { content: '\\e903'; } /* '' */
.wdn-icon-facebook-circled::before { content: '\\f051'; } /* '' */
.wdn-icon-twitter-circled::before { content: '\\f057'; } /* '' */
.wdn-icon-right-open-mini::before { content: '\\f0c8'; } /* '' */
.wdn-icon-menu::before { content: '\\f0c9'; } /* '' */
.wdn-icon-spotify::before { content: '\\f1bc'; } /* '' */
.wdn-icon-wrench::before { content: '🔧'; } /* '\\1f527' */
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    public function getTemplateName()
    {
        return "wdn/templates_5.3/scss/deprecated/deprecated.text.scss";
    }

    public function getDebugInfo()
    {
        return array (  43 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("////////////////////////////
// THEME / DEPRECATED / TEXT
////////////////////////////


// Prepend deprecated headings with '.unl ' to ensure styles override 5.3 theme heading styles.
.unl .wdn-brand {
  font-weight: 400;
}

.unl .wdn-brand-caps {
  font-weight: 400;
  text-transform: uppercase;
}

.unl .wdn-sans-caps {
  letter-spacing: .02em;
  line-height: 1.333;
  text-transform: uppercase;
}

.unl .wdn-alt-header {
  @include txt-base;
  letter-spacing: .02em;
  line-height: 1.333;
  text-transform: uppercase;
}

.unl .wdn-list-header {
  @include bb-1;
  border-color: var(--b);
  @include txt-base;
  letter-spacing: .02em;
  line-height: 1.333;
  @include pb-1;
  @include pt-4;
  text-transform: uppercase;
}

.unl .wdn-subhead {
  display: block;
  font-size: #{ms(-2)}rem; // .75rem
  font-weight: normal;
  @include ls-2;
  @include mb-3;
  text-transform: uppercase;
}

.unl p,
.unl span,
.unl div,
.unl ul,
.unl li,
.unl section,
.unl img {

  + h1,
  + h2,
  + h3,
  + h4,
  + h5,
  + h6 {
    margin-top: 1em;
  }
}

.unl h1,
.unl h2,
.unl h3 {

  > .wdn-subhead,
  + .wdn-subhead {
    font-size: 1rem;
  }
}

.unl h4,
.unl h5,
.unl h6 {

  > .wdn-subhead,
  + .wdn-subhead {
    font-size: .75rem;
  }
}

.wdn-subhead {

  + h1,
  + h2,
  + h3,
  + h4,
  + h5,
  + h6 {
    margin-top: 0;
  }
}

.unl p,
.unl span,
.unl div,
.unl ul,
.unl li,
.unl section,
.unl img {

  + .wdn-subhead {
    margin-bottom: 0;
  }
}

.wdn-list-reset {
  list-style: none;
  padding-left: 0;
}

.wdn-intro-p {
  @include txt-lg;
}

.unl p.small {
  @include txt-xs;
}

// ICON FONT - see /wdn/templates_4.1/fonts/fontello/readme.md
@font-face {
  font-family: 'wdn-icon';
  font-style: normal;
  font-weight: normal;
  src: url('../fonts/fontello/wdn-icon.woff2?92731841') format('woff2'),
       url('../fonts/fontello/wdn-icon.woff?92731841') format('woff');
}

[class^=\"wdn-icon-\"]::before,
[class*=\" wdn-icon-\"]::before {
  display: inline-block;
  font-family: 'wdn-icon';
  font-style: normal;
  font-variant: normal; // For safety - reset parent styles, that can break glyph codes
  font-weight: normal;
  margin-right: .2em;
  speak: none;
  text-align: center;
  text-decoration: inherit;
  text-transform: none; // For safety - reset parent styles, that can break glyph codes
  width: 1em;
}

.wdn-icon-mail::before { content: '\\2709'; } /* '✉' */
.wdn-icon-location::before { content: '\\e07a'; } /* '' */
.wdn-icon-user::before { content: '\\e800'; } /* '' */
.wdn-icon-snapchat::before { content: '\\e801'; } /* '' */
.wdn-icon-search::before { content: '\\e802'; } /* '' */
.wdn-icon-comment::before { content: '\\e803'; } /* '' */
.wdn-icon-comment-alt::before { content: '\\e804'; } /* '' */
.wdn-icon-cancel::before { content: '\\e805'; } /* '' */
.wdn-icon-attention::before { content: '\\e806'; } /* '' */
.wdn-icon-info::before { content: '\\e807'; } /* '' */
.wdn-icon-angle-double-right::before { content: '\\e808'; } /* '' */
.wdn-icon-star-circled::before { content: '\\e809'; } /* '' */
.wdn-icon-angle-double-left::before { content: '\\e80a'; } /* '' */
.wdn-icon-ok::before { content: '\\e80b'; } /* '' */
.wdn-icon-plus::before { content: '\\e80c'; } /* '' */
.wdn-icon-minus::before { content: '\\e80d'; } /* '' */
.wdn-icon-key::before { content: '\\e80e'; } /* '' */
.wdn-icon-up-small::before { content: '\\e80f'; } /* '' */
.wdn-icon-calendar-empty::before { content: '\\e810'; } /* '' */
.wdn-icon-rss-squared::before { content: '\\e811'; } /* '' */
.wdn-icon-calendar::before { content: '\\e812'; } /* '' */
.wdn-icon-youtube-play::before { content: '\\e813'; } /* '' */
.wdn-icon-linkedin-squared::before { content: '\\e814'; } /* '' */
.wdn-icon-instagram::before { content: '\\e815'; } /* '' */
.wdn-icon-flickr::before { content: '\\e816'; } /* '' */
.wdn-icon-vimeo::before { content: '\\e817'; } /* '' */
.wdn-icon-pinterest::before { content: '\\e818'; } /* '' */
.wdn-icon-tumblr::before { content: '\\e819'; } /* '' */
.wdn-icon-foursquare::before { content: '\\e81a'; } /* '' */
.wdn-icon-gplus::before { content: '\\e81b'; } /* '' */
.wdn-icon-share::before { content: '\\e81c'; } /* '' */
.wdn-icon-twitter::before { content: '\\e81d'; } /* '' */
.wdn-icon-facebook::before { content: '\\e81e'; } /* '' */
.wdn-icon-link::before { content: '\\e81f'; } /* '' */
.wdn-icon-blogger::before { content: '\\e820'; } /* '' */
.wdn-icon-play-circled::before { content: '\\e821'; } /* '' */
.wdn-icon-map::before { content: '\\e822'; } /* '' */
.wdn-icon-clock::before { content: '\\e823'; } /* '' */
.wdn-icon-rocket::before { content: '\\e825'; } /* '' */
.wdn-icon-pause::before { content: '\\e82a'; } /* '' */
.wdn-icon-print::before { content: '\\e901'; } /* '' */
.wdn-icon-phone::before { content: '\\e902'; } /* '' */
.wdn-icon-home::before { content: '\\e903'; } /* '' */
.wdn-icon-facebook-circled::before { content: '\\f051'; } /* '' */
.wdn-icon-twitter-circled::before { content: '\\f057'; } /* '' */
.wdn-icon-right-open-mini::before { content: '\\f0c8'; } /* '' */
.wdn-icon-menu::before { content: '\\f0c9'; } /* '' */
.wdn-icon-spotify::before { content: '\\f1bc'; } /* '' */
.wdn-icon-wrench::before { content: '🔧'; } /* '\\1f527' */
", "wdn/templates_5.3/scss/deprecated/deprecated.text.scss", "/Users/abhirijal/unl_lockup_factory/templates/wdn/templates_5.3/scss/deprecated/deprecated.text.scss");
    }
}
