(function () {
    const scrollImages = document.querySelectorAll('.slide-in');
    const scrollableContainer = document.querySelector(".site-wrap");
    scrollableContainer.addEventListener("scroll", debounce(checkSlide));
    
    function checkSlide() {
        scrollImages.forEach(scrollImage => {
            // half way through the image
            const slideInAt = (scrollableContainer.scrollTop + scrollableContainer.clientHeight) - scrollImage.height / 2;
            
            // bottom of the image
            const imageBottom = scrollImage.offsetTop + scrollImage.height - 100;
            const isHalfShown = slideInAt > scrollImage.offsetTop;
            const isNotScrolledPassed = scrollableContainer.scrollTop < imageBottom;
    
            if (isHalfShown && isNotScrolledPassed) {
                scrollImage.classList.add('active');
            } else {
                scrollImage.classList.remove('active');
            }
        });
    }
    function debounce(func, wait = 10, immediate = true) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
})();
