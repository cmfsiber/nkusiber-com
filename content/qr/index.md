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
 <table style="padding: 1em; border-spacing: 55em; border: 1px solid black; ">
  <tr>
    <th>Kategori</th>
    <th>Cihazınız</th>
  </tr>
  <tr>
    <td>Tarayıcı</td>
    <td id="p1">.</td>
  </tr>
  <tr>
    <td>Telefon Tipi</td>
    <td id="p2">.</td>
  </tr>
  <tr>
    <td>İşletim Sistemi</td>
    <td id="p3">.</td>
  </tr>
  <tr>
    <td>Saat Dilimi</td>
    <td id="p4">.</td>
  </tr>
  <tr>
    <td>Diller</td>
    <td id="p5">.</td>
  </tr>
</table> 
</big>

<!---
<big>
<b>
<p id="p1">.</p>
<p id="p2">.</p>
<p id="p3">.</p>
<p id="p4">.</p>
<p id="p5">.</p>
</b>
</big>
--->
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
    var mobilcihaz = "Telefondan girdiğinize emin misiniz?";

  if (ua.platform.match(/iphone/i))
    var mobilos = "iOS";
  else
    var mobilos = ua.platform;

document.getElementById("p1").innerHTML = ua.name;
document.getElementById("p2").innerHTML = mobilcihaz;
document.getElementById("p3").innerHTML = mobilos;
document.getElementById("p4").innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("p5").innerHTML = navigator.languages;
</script>



## İlginizi Çekebildik Mi?
Sponsor arayışındayız.
Bize ulaşın: nkusiber@gmail.com

