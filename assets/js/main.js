/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image[href$=".jpg"], .work-item a.image[href$=".png"], .work-item a.image[href$=".jpeg"], .work-item a.image[href$=".gif"]',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});


			// Contact form submission handling
			document.addEventListener("DOMContentLoaded", () => {
			const form = document.querySelector("form[action*='formspree']");
			const status = document.createElement("p");

			if (!form) return; // Exit if the form isn't on this page

			status.id = "form-status";
			status.style.marginTop = "1em";
			status.style.display = "none";
			form.appendChild(status);

			form.addEventListener("submit", async (e) => {
				e.preventDefault();
				const data = new FormData(form);

				try {
				const response = await fetch(form.action, {
					method: form.method,
					body: data,
					headers: { Accept: "application/json" },
				});

				if (response.ok) {
					status.textContent = "Message sent successfully! I'll get back to you soon.";
					status.style.color = "#44c9b8";
					status.style.display = "block";
					form.reset();
				} else {
					status.textContent = "Oops! There was a problem submitting your message.";
					status.style.color = "#dc3545";
					status.style.display = "block";
				}
				} catch (error) {
				status.textContent = "Network error. Please try again later, thanks!";
				status.style.color = "#dc3545";
				status.style.display = "block";
				}
			});
			});
		
		
			

			// Fade in when the page loads
window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});

// Fade out when clicking internal links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#');

    if (!isExternal) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.add('is-exiting');
        document.body.style.opacity = 0;
        setTimeout(() => {
          window.location = link.href;
        }, 500); // Match this to your CSS transition duration
      });
    }
  });
});


})(jQuery);