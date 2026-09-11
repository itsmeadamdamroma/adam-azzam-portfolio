// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for all resources to load
window.addEventListener('load', function() {
  console.log('Page loaded, initializing animation...');
  
  // Create the SignatureAnimation component inline
  const SignatureAnimation = React.createElement(function() {
    // Component logic here
    const [loaded, setLoaded] = React.useState(false);
    const canvasRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const videoRef = React.useRef(null);

    React.useEffect(() => {
      console.log('SignatureAnimation mounted');

      // Initialize the scroll animation
      const initAnimation = function() {
        console.log('Initializing video animation');

        if (!videoRef.current || !containerRef.current) {
          console.error('Video or container ref not found');
          return;
        }

        const video = videoRef.current;

        // Create ScrollTrigger animation
        const scrollTriggerInstance = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 10,
          toggleActions: 'restart none none none',
          pin: true,
          pinSpacing: false,
          pinReparent: false,
          anticipatePin: 2,
          markers: false,
          onUpdate: function(self) {
            const duration = video.duration || 1;
            video.currentTime = self.progress * duration;
          }
        });

        // Debounce function for resize events
        const debounce = (func, wait) => {
          let timeout;
          return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
          };
        };

        // Use debounce for resize event listener
        window.addEventListener('resize', debounce(() => {
          ScrollTrigger.refresh();
        }, 200));

        return function() {
          window.removeEventListener('resize', debounce(() => {
            ScrollTrigger.refresh();
          }, 200));
          if (scrollTriggerInstance) {
            scrollTriggerInstance.kill();
          }
        };
      };

      initAnimation();

      // Cleanup function
      return function() {
        console.log('SignatureAnimation unmounting...');
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }
      };
    }, []);

    // Component render
    return React.createElement('div', {
      ref: containerRef,
      style: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement('video', {
      ref: videoRef,
      src: '../../assets/Uploads/modular/Comp.mp4',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block'
      },
      controls: false,
      muted: true
    }));
  });

  // Find the container and render the component
  const container = document.querySelector('#video-container');
  if (container) {
    console.log('Found container, rendering SignatureAnimation...');
    ReactDOM.render(SignatureAnimation, container);
  } else {
    console.error('Could not find #video-container element');
  }
});