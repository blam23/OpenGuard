'use strict';

var whitelistDomains = [
    '.dev',
    'bbc.co.uk',
    'bbcimg.co.uk',
    'bbci.co.uk',
    'bbc.com',
    'gov.uk',
    'reddit.com',
    'redd.it',
    'redditstatic.com',
    'redditmedia.com',
    'google.com',
    'google.co.uk',
    'irccloud.com',
    'irccloud-cdn.com',
    'stackoverflow.com',
    'amazon.com',
    'amazon.co.uk',
    'youtube.com',
    'ytimg.com',
    'brunel.ac.uk',
    'netflix.com',
    'nflxvideo.net',
    'nflximg.net',
    'nflxext.com',
    'github.com',
    'githubapp.com',
    'github.io',
    'githubusercontent.com',
    'mozilla.org',
    'mozilla.net',
    'visualstudio.com',
    'vsassets.io',
    'imgur.com',
    'gfycat.com',
    'giphy.com',
    'streamable.com',
    'twitch.tv',
    'soundcloud.com',
    'googlevideo.com',
    'ggpht.com', // Google
    'gstatic.com', // Google
    'googleapis.com',
    'chrome.com',
    'twitter.com',
    'twimg.com',
    'whatsapp.com',
    'stackoverflow.com',
    'ikea.com',
    'jsdelivr.com', // CDN -> might not be great to have here
    'jsdelivr.net', // CDN -> might not be great to have here
    
    'facebook.com',
    'fbcdn.net',

    'trello.com',
    'cloudfront.net',
    'stackedit.io',
    'typekit.com',
    'typekit.net',

    /* Akamai CDN */
    'akamai.net',
    'akamaihd.net',
    /*'akamaiedge.net',
    'akamaized.net',
    'edgesuit.net',
    'edgekey.net',
    'srip.net',
    'akamaitechnologies.com',
    'akamaitechnologies.fr',*/
];

// TODO: add "ad count" measure
//  -> if site has too many ads : non ad ratio
//  kill it
// TODO: This includes trackers, should split?
//  do we even need adblock here or leave to uBlock, etc?
var adSites = [
    'doubleclick.net',
    'adsafeprotected.com',
    'doubleclick.net',
    'stickyadstv.com',
    'adnxs.com',
    '2mdn.net',
    'adlooxtracking.com',
    'effectivemeasure.net',
    'googletagservices.com',
    'googleadservices.com',
    'googleusercontent.com',
    'adzerk.net',
    'atdmt.com',
    'adsafeprotected.com',
    'zkcdn.net',
    'scorecardresearch.com',
    'amazon-adsystem.com',
    'krxd.net',
    'ipredtictive.com',
    'agkn.com',
    'ads.yahoo.com',
    'advertising.com',
    'btrll.com',
    'adnxs.com',
    'adtech.de',
    'casalmedia.com',
    'openx.net',
    'bidswitch.net',
    'spotxchange.com',
    'contextweb.com',
    'gvt2.com',
    'moatads.com',
    'mathtag.com',
    'rlcdn.com',
    'demdex.com',
    'mookie1.com',
    'adform.net',
    'semasio.net',
    'smartclip.net',
    'ib-ibi.com.net',
    'adscale.de',
    'nexac.com',
    'adingo.jp',
    'adtechus.com',
    'addthis.com',
    'gssprt.jp',
    'gv2.com',
];

// TODO: This
var trackerSites = [
    'quantserve.com',
    'quantcount.com',
    'chartbeat.com',
    'chartbeat.net',
    'edigitalsurvey.com',
    'pixel.quantserve.com',
    'google-analytics.com',
    'googlesyndication.com',
    'googletagmanager.com',
    'rubiconproject.com',
    'monetizejs.com',
    'hs-analytics.com',
    'hs-analytics.net',
    'hs-scripts.com',
    'facebook.net',
    'usemessages.com', // ?
    'hubspot.com', // ?
    'eesysoft.com', // TODO: remove?
];

// Track in some way such as a site opened from
//  Facebook are less trusted, etc.
var socialSites = [
    'facebook.com',
    'wp.com',
    'wordpress.com',
];

// Use these to tag a site as having payment related stuff on it.
// TODO: Move somewhere else, add more, banks, etc.
var paymentSites = [
    'stripe.com',
    'stripe.network',
    'paypal.com'
];