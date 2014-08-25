//  LauncherOSX
//
//  Created by Boris Schneiderman.
//  Copyright (c) 2014 Readium Foundation and/or its licensees. All rights reserved.
//  
//  Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
//  1. Redistributions of source code must retain the above copyright notice, this 
//  list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice, 
//  this list of conditions and the following disclaimer in the documentation and/or 
//  other materials provided with the distribution.
//  3. Neither the name of the organization nor the names of its contributors may be 
//  used to endorse or promote products derived from this software without specific 
//  prior written permission.
//  
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
//  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
//  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
//  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
//  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
//  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
//  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
//  OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
//  OF THE POSSIBILITY OF SUCH DAMAGE.

ReadiumSDK.HostAppFeedback = function() {
	ReadiumSDK.on(ReadiumSDK.Events.READER_INITIALIZED, function() {
                  
        window.navigator.epubReadingSystem.name = "Launcher-iOS";
        window.navigator.epubReadingSystem.version = "0.0.1";
                  
                  
		ReadiumSDK.reader.on(ReadiumSDK.Events.PAGINATION_CHANGED, notifyHost("pageDidChange", "paginationInfo"), this);
		ReadiumSDK.reader.on(ReadiumSDK.Events.SETTINGS_APPLIED, notifyHost("settingsDidApply"), this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.MEDIA_OVERLAY_STATUS_CHANGED, notifyHost("mediaOverlayStatusDidChange"), this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.MEDIA_OVERLAY_TTS_SPEAK, notifyHost("mediaOverlayTTSDoSpeak"), this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.MEDIA_OVERLAY_TTS_STOP, notifyHost("mediaOverlayTTSDoStop"), this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.FOOTNOTE_CLICKED, notifyHost("footnoteClicked"), this);
        
        notifyHost("readerDidInitialize")();
	}, this);
}();

/**
 * Returns a function to be called when a Backbone event is triggered.
 */
function notifyHost(name, infoSubKey) {
    return function(info) {
        var uri = "epubobjc://" + name;
        if (info) {
            if (infoSubKey)
                info = info[infoSubKey];
            uri += "?q=" + encodeURIComponent(JSON.stringify(info));
        }
        
//        console.log("EVENT: " + uri);
        window.location.href = uri;
    };
}