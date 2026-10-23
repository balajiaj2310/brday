/* ==========================================================================
   ✏️  EDIT THIS FILE — everything personal lives here.
   You never need to touch style.css or script.js to change words, dates,
   photos, colours or buttons. Every line marked  ← CHANGE ME  is yours.
   ========================================================================== */

window.INVITE = {

  /* ---------- 1. THE BIRTHDAY PERSON ---------- */
  name: "Your Name Here",              // ← CHANGE ME  (e.g. "Aanya")
  age: "",                             // ← CHANGE ME  (e.g. "24" — leave "" to hide)
  tagline: "A little celebration of a very special soul.",
  introTitle: "A little about the birthday girl",   // heading of the introduction section
  introText: [
    // ← CHANGE ME: write 1–3 short paragraphs in your own words.
    "Write a few lines here about the birthday person — in your own words.",
    "Each line in this list becomes its own paragraph."
  ],

  /* ---------- 2. OPENING ENVELOPE ---------- */
  welcome: {
    line: "Something special has been waiting for you...",
    openButton: "Open Your Invitation ♡",
    skipButton: "Skip intro",
    toName: ""                         // optional: "For Priya" shown on the envelope. "" to hide.
  },

  /* ---------- 3. EVENT DETAILS ---------- */
  event: {
    // Date + time in YYYY-MM-DDTHH:MM:SS (24-hour, your local time). ← CHANGE ME
    // Leave "" and the countdown shows a friendly fallback instead of breaking.
    dateTime: "2026-12-20T18:00:00",
    timeZoneLabel: "IST",              // text only, shown beside the time
    venueName: "Venue Name Here",      // ← CHANGE ME
    address: "Street address, City",   // ← CHANGE ME
    // Paste a Google Maps share link, OR leave "" and the button searches your address.
    mapLink: "",
    dressCode: "Soft pastels & pretty bows",   // ← CHANGE ME ("" to hide)
    invitationMessage:
      "Come celebrate with us — there will be good company, sweet things and lots of love. Your presence would mean the world."
  },

  /* ---------- 4. PHOTO MEMORIES ---------- */
  // Put your photos in assets/images/ and change the "src" below.
  // size: "sm" | "md" | "lg"   tilt: degrees (-6 … 6)
  photos: [
    { src: "assets/images/photo1.svg", caption: "Caption one",   size: "md", tilt: -3 },
    { src: "assets/images/photo2.svg", caption: "Caption two",   size: "lg", tilt: 2 },
    { src: "assets/images/photo3.svg", caption: "Caption three", size: "md", tilt: -1.5 },
    { src: "assets/images/photo4.svg", caption: "Caption four",  size: "sm", tilt: 3.5 },
    { src: "assets/images/photo5.svg", caption: "Caption five",  size: "md", tilt: -2.5 },
    { src: "assets/images/photo6.svg", caption: "",              size: "md", tilt: 1.5 }
  ],
  galleryTitle: "Memories we keep",
  gallerySubtitle: "Tap a photograph to look closer",

  /* ---------- 5. THE LETTER ---------- */
  letter: {
    title: "A Little Letter for You",
    revealButton: "Break the wax seal ♡",
    greeting: "Dear [Name],",                                  // ← CHANGE ME
    // Three separate blocks. Each string is one paragraph.
    wishes: [                                                  // ← CHANGE ME: birthday wishes
      "Write your birthday wishes here, in your own voice."
    ],
    memories: [                                                // ← CHANGE ME: memories
      "Write the memories you want to remember together here."
    ],
    finalMessage: [                                            // ← CHANGE ME: final heartfelt message
      "Write your final, heartfelt message here."
    ],
    // Optional typewriter effect: put a sentence from above here EXACTLY, or leave [].
    // Sentences listed here are typed out letter-by-letter when the letter appears.
    typewriter: [],
    closing: "With all my love,",
    signature: "Your Name",                                    // ← CHANGE ME (handwritten style)
    closingNote: "P.S. Add a little afterthought here, or leave empty.",
    // Small clickable notes under the letter ("surprise notes"):
    surpriseNotes: [                                           // ← CHANGE ME (or [] to hide)
      "Surprise note #1 — write something sweet.",
      "Surprise note #2 — a tiny promise, a joke, a memory.",
      "Surprise note #3 — whatever your heart says."
    ],
    surpriseTitle: "Tap a note for a little surprise"
  },

  /* ---------- 6. RSVP ---------- */
  rsvp: {
    title: "Will you be there?",
    subtitle: "Kindly let us know",
    deadlineText: "",                  // e.g. "Please reply by 10 December" — "" to hide
    buttons: { yes: "Yes, I'll Be There ♡", maybe: "Maybe", no: "Sorry, Can't Make It" },
    confirmations: {
      yes: "Wonderful! We can't wait to celebrate with you ♡",
      maybe: "Thank you — we hope you can make it!",
      no: "We'll miss you, and thank you for letting us know ♡"
    },

    // HOW RESPONSES REACH YOU — pick ONE (see README "RSVP setup"):
    //  A) whatsappNumber: replies open a ready-typed WhatsApp message to YOU.
    //     International format, digits only, e.g. "919876543210". Works with no signup.
    whatsappNumber: "",                // ← CHANGE ME
    //  B) formEndpoint: a free Formspree / Web3Forms URL — responses land in your email inbox.
    //     e.g. "https://formspree.io/f/xxxxxxx"
    formEndpoint: ""                   // ← OPTIONAL
    // If BOTH are empty, the reply is only remembered on that guest's own device and
    // the page SAYS SO honestly — it never pretends you received it.
  },

  /* ---------- 7. MUSIC & WISHES ---------- */
  music: {
    title: "Our little soundtrack",
    // Put an .mp3 in assets/music/ and set the path, e.g. "assets/music/song.mp3". "" = no player.
    file: "",                          // ← CHANGE ME
    songName: "Song title — Artist",   // shown on the player
    // Optional link to a Spotify / YouTube / Apple Music playlist. "" hides the button.
    playlistLink: "",                  // ← OPTIONAL
    playlistButton: "Open the playlist ♪"
  },
  wishes: {
    title: "Send Your Wishes",
    subtitle: "Leave a little note for the birthday girl",
    placeholderName: "Your name",
    placeholderMessage: "Write your wish here…",
    button: "Send my wish ♡"
    // Wishes use the same delivery route as RSVP (WhatsApp / form). See README.
  },

  /* ---------- 8. FINAL THANK-YOU ---------- */
  thanks: {
    title: "Thank you for being part of this",
    text: "Every guest makes this day brighter. See you soon ♡",
    signoff: "With love"
  },

  /* ---------- 9. BUTTON & MENU LABELS ---------- */
  labels: {
    nav: { home: "Invitation", countdown: "Countdown", about: "About", memories: "Memories",
           letter: "Letter", details: "Details", rsvp: "RSVP", wishes: "Wishes" },
    openMaps: "Open in Google Maps ♡",
    addToCalendar: "Add to calendar",
    backToTop: "Back to top"
  },

  /* ---------- 10. THEME COLOURS ---------- */
  // Hex colours. These feed straight into the CSS.
  theme: {
    blush:   "#f6d6dc",
    rose:    "#c98b97",
    burgundy:"#7a2e43",
    ivory:   "#fff9f3",
    cream:   "#f7ebdd",
    ink:     "#4a2a33"
  }
};
