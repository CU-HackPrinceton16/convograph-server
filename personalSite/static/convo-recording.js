function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
                navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
            }
            var mediaConstraints = {
                audio: true
            };
            document.querySelector('#convo-recording #start-recording').onclick = function() {
                //this.disabled = true;
                captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
            };
            document.querySelector('#convo-recording #stop-recording').onclick = function() {
                //this.disabled = true;
                mediaRecorder.stop();
                mediaRecorder.stream.stop();
                document.querySelector('#convo-recording #start-recording').disabled = false;
            };
            /*document.querySelector('#convo-recording #save-recording').onclick = function() {
                this.disabled = true;
                mediaRecorder.save();
            };*/

            var mediaRecorder;
            function onMediaSuccess(stream) {
                mediaRecorder = new MediaStreamRecorder(stream);
                mediaRecorder.stream = stream;

                mediaRecorder.recorderType = StereoAudioRecorder;
                mediaRecorder.mimeType = 'audio/wav';

                mediaRecorder.audioChannels = 1; //!!document.getElementById('left-channel').checked ? 1 : 2;
                var timeInterval = 20 * 60 * 1000;
                mediaRecorder.start(timeInterval);
                mediaRecorder.ondataavailable = function(blob) {
                    mediaRecorder.stop();
                    mediaRecorder.save();
                    document.querySelector('#convo-recording #start-recording').disabled = false;
                };
            }

            function onMediaError(e) {
                console.error('media error', e);
            }

            var index = 1;
            // below function via: http://goo.gl/B3ae8c
            function bytesToSize(bytes) {
                var k = 1000;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes === 0) return '0 Bytes';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }

            // below function via: http://goo.gl/6QNDcI
            function getTimeLength(milliseconds) {
                var data = new Date(milliseconds);
                return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
            }

            window.onbeforeunload = function() {
                document.querySelector('#convo-recording #start-recording').disabled = false;
            };