function installServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported - aborting');
    return;
  }

  let currentVersion;

  navigator.serviceWorker.onmessage = function (evt) {
    if (typeof evt.data.version !== 'undefined') {
      if (!currentVersion) {
        currentVersion = evt.data.version;
        console.log('currentVersion', currentVersion);
      } else {
        const newVersion = evt.data.version;
        console.log('currentVersion', currentVersion);
        console.log('newVersion', newVersion);
        const cvParts = currentVersion.split('.');
        const nvParts = newVersion.split('.');
        console.log(`Service Worker updated from v${currentVersion} to v${newVersion}`);
        // if (cvParts[0] !== nvParts[0]) {
        //  console.log(`Update is major - notify user to update`);
          notifyToRefresh();
        // }
      }
    }
  };

  navigator.serviceWorker.register('service-worker.js').then(function (registration) {
    if (registration.active) {
      // noinspection TypeScriptUnresolvedFunction
      registration.active.postMessage('version');
    }

    registration.onupdatefound = function () {
      console.log('A new version has been found... Installing...');

      registration.installing.onstatechange = function () {
        if (this.state === 'installed') {
          return console.log('App updated');
        }

        if (this.state === 'activated') {
          // noinspection TypeScriptUnresolvedFunction
          registration.active.postMessage('version');
        }

        console.log('Incoming SW state:', this.state);
      };
    };
  });
}

function notifyToRefresh() {
  if (!("Notification" in window)) {
    console.log("Notification API not supported by this browser");
  } else {
    if (Notification.permission === "granted") {
      sendNotification();
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          sendNotification();
        }
      })
    } else {
      console.log('notification.permission', Notification.permission)
    }
  }

  function sendNotification() {
    try {
      console.log('Waiting for serviceworker to be ready before sending refresh notification');
      navigator.serviceWorker.ready.then(function(registration) {
        console.log('Showing notification for site update');
        registration.showNotification('Site updated', {
          body: 'Refresh to get the latest version',
          icon: '/assets/icon/apple-icon-180x180.png',
          badge: '/assets/icon/badge-72x72.png',
          tag: 'sn-serviceworker-update'
        });
      })
    } catch(e) {
      console.log('serviceworker showNotification not supported, trying html5');
      const notification = new Notification('Site updated', {
        body: 'Refresh to get the latest version',
        icon: '/assets/icon/apple-icon-180x180.png',
        badge: '/assets/icon/badge-72x72.png',
        tag: 'sn-serviceworker-update'
      });
    }
  }
}
