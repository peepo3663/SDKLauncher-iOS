//  LauncherOSX
//
//  Created by Boris Schneiderman.
//  Copyright (c) 2012-2013 The Readium Foundation.
//
//  The Readium SDK is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

ReadiumSDK.HostAppFeedback = function() {
	ReadiumSDK.on(ReadiumSDK.Events.READER_INITIALIZED, function() {
		ReadiumSDK.reader.on(ReadiumSDK.Events.PAGINATION_CHANGED, this.onPaginationChanged, this);
		ReadiumSDK.reader.on(ReadiumSDK.Events.SETTINGS_APPLIED, this.onSettingsApplied, this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.MEDIA_OVERLAY_STATUS_CHANGED, this.onMediaOverlayStatusChanged, this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.MEDIA_OVERLAY_TTS_SPEAK, this.onMediaOverlayTTSSpeak, this);
        ReadiumSDK.reader.on(ReadiumSDK.Events.MEDIA_OVERLAY_TTS_STOP, this.onMediaOverlayTTSStop, this);
        
		window.location.href = "epubobjc:readerDidInitialize";
	}, this);

	this.onPaginationChanged = function(pageChangeData) {
		window.location.href = "epubobjc:pageDidChange?q=" +
			encodeURIComponent(JSON.stringify(pageChangeData.paginationInfo));
	};

	this.onSettingsApplied = function() {
		window.location.href = "epubobjc:settingsDidApply";
	};

    this.onMediaOverlayStatusChanged = function(status) {
        window.location.href = "epubobjc:mediaOverlayStatusDidChange?q=" +
			encodeURIComponent(JSON.stringify(status));
    };

    this.onMediaOverlayTTSSpeak = function(tts) {
        window.location.href = "epubobjc:mediaOverlayTTSDoSpeak?q=" +
			encodeURIComponent(JSON.stringify(tts));
    };

    this.onMediaOverlayTTSStop = function() {
		window.location.href = "epubobjc:mediaOverlayTTSDoStop";
    };
}();
