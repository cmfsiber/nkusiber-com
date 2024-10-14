---
title: "Tarayıcı Üzerinden Cihaz Tanımlama"
draft: false
date: 2024-10-08
authors:
 - "yigit-altinay"
---
## QR Kodumuzu tarattınız. İyi yaptınız.
Siz siz olun, güvenmediğiniz QR kodları taratmayın.
Tarayıcınızın sizinle ilgili bolca veri sızdırdığını biliyor muydunuz?
Elimize sizinle ilgili birkaç veri geçebilirdi.
Örnek vermek gerekirse:

<big>
<b>
<p id="p1">.</p>
<p id="p2">.</p>
<p id="p3">.</p>
<p id="p4">.</p>
<p id="p5">.</p>
</b>
</big>

Bize inanmadınız mı? Başka bir telefondan aynı QR kodu taratın.

İkna olduysanız içiniz rahat olsun.

Bütün testler tarayıcı tarafında yapıldı ve hiçbir veri cihazınızı terk etmedi.

<script type="module">
  console.log("test1");
  import BrowserDetector from '/js/browser-dtector.js';

  const detector = new BrowserDetector(window.navigator.userAgent);
  const ua = detector.parseUserAgent();
  console.log(ua);

  if (ua.isAndroid)
    var mobilcihaz = "Android Grup";
  else if (ua.isWebkit)
    var mobilcihaz = "iPhone";
  else
    var mobilcihaz = "Emin olamadık...";

  if (ua.platform.match(/iphone/i))
    var mobilos = "iOS";
  else
    var mobilos = ua.platform;

document.getElementById("p1").innerHTML = "Tarayıcı: " + ua.name;
document.getElementById("p2").innerHTML = "Telefon Tipi: " + mobilcihaz;
document.getElementById("p3").innerHTML = "İşletim Sistemi: " + mobilos;
document.getElementById("p4").innerHTML = "Saat Dilimi: " + Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("p5").innerHTML = "Diller: " + navigator.languages;
</script>



## İlginizi Çekebildik Mi?
Sponsor arayışındayız.
Bize ulaşın: nkusiber@gmail.com

