---
title: "Kısım 15 - Depoların Derinliklerine..."
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 15. Kısım - Depoların Derinliklerine...

* [Ders videosu](https://youtu.be/DMenSNaMiD4)  
* [Tamamlayıcı video](https://www.youtube.com/live/2lYo_FJxQR8?feature=shared)  

## GİRİŞ

Başlangıçta, sunucunuza `apt install` komutunu kullanarak bazı yazılım paketleri yüklediniz. Bu işlem oldukça kolaydı ve Linux'ta yazılım yükleme modelinin Android, iPhone ve giderek MacOS ve Windows’taki uygulama mağazalarına benzediğinden bahsetmiştik.  

Bugün, bu sistemin nasıl çalıştığını daha derinlemesine inceleyeceğiz. Sistem kaynaklarını güvenli bir şekilde genişletmenin yollarını öğrenirken, resmi kaynakların ötesine geçmenin avantajlarını ve dezavantajlarını da göreceksiniz.  

## BUGÜNKÜ GÖREVLERİNİZ

* Yeni bir depo ekleyin.  
* Bir depoyu kaldırın.  
* Bir programın hangi depodan geldiğini öğrenin (apt-search).  
* apt kullanmadan bir program yükleyin.  

## DEPOLAR VE VERSİYONLAR

Her Linux kurulumu birkaç önemli özelliğe sahiptir:  

* **Sürüm**: Örneğin, Ubuntu 20.04, CentOS 5, RHEL 6  
* **Bit boyutu**: 32-bit veya 64-bit  
* **Çip türü**: Intel, AMD, PowerPC, ARM  

Sürüm numarası, yükleyebileceğiniz uygulamaların sürümünü belirler. Örneğin, Ubuntu 18.04 (Nisan 2018'de piyasaya sürülmüştür) Apache 2.4.29 ile birlikte gelmiştir. Bu nedenle, sunucunuz 18.04 çalıştırıyorsa, beş yıl sonra bile Apache'yi yükleseniz bu sürümü alırsınız. Bu, sistemin kararlılığını sağlar ancak web tasarımcıları için daha yeni sürümlerde sunulan bazı özelliklerden mahrum kalma anlamına gelir. Güvenlik yamaları, mevcut kararlı sürüme **backporting** yöntemiyle entegre edilir.  

## TÜM BU AYARLAR NEREDE?

Burada, Debian ve Ubuntu dağıtımlarının kullandığı paket yöneticisini inceleyeceğiz. Bu sistem `apt` komutunu kullanır. Fedora, RHEL, CentOS gibi dağıtımlarda kullanılan `yum` ve `dnf` gibi araçlar da benzer şekilde çalışır.  

Konfigürasyon dosyaları, _/etc/apt_ dizini altında bulunur. Paketlerin hangi depolardan geldiğini görmek için şu dosyayı inceleyin:  

```bash
less /etc/apt/sources.list
```

Bu dosyada belirli sürümünüz için kullanılan depoların URL’lerini göreceksiniz. Örneğin:  

```
deb http://archive.ubuntu.com/ubuntu precise-security main restricted universe
```

Buradaki sözdizimiyle ilgili endişelenmenize gerek yok. Ancak bazı durumlarda ekstra depolar eklemek yaygındır. Bunun nasıl yapıldığını şimdi inceleyeceğiz.  

## EKSTRA DEPOLAR

"Standart" depolarda çok fazla yazılım bulunsa da (CentOS için 3.000’den fazla, Ubuntu için bunun on katı), bazı paketler bulunmaz. Bunun iki ana nedeni olabilir:  

* **Kararlılık:** CentOS, ticari sunucu kurulumlarında kararlılığı sağlamak için oyunlar gibi gereksiz paketleri içermez.  
* **İdeoloji:** Ubuntu ve Debian, "yazılım özgürlüğü" ilkesine bağlıdır. Bu, fiyat değil, özgürlük anlamına gelir. Bu nedenle, bazı ihtiyaç duyduğunuz paketler varsayılan olarak bulunmaz.  

## EKSTRA DEPOLARI ETKİNLEŞTİRME

Önce mevcut paketlerin sayısını öğrenin. Bunun için:  

```bash
apt-cache dump | grep "Package:" | wc -l
```

Bu, mevcut sistemde yüklenebilecek tüm paketlerin sayısını verir. Ancak bazı Linux dağıtımlarında ek depolar etkinleştirildiğinde daha fazla paket sağlanabilir. Ubuntu'da "Universe" ve "Multiverse" depoları genellikle varsayılan olarak devre dışıdır. **Multiverse**, güvenlik güncellemeleri içermeyen ve özgür olmayan yazılımları içerir.  

Multiverse deposunu etkinleştirmek için şu rehberi kullanın:  

* [Komut Satırından Depo Etkinleştirme](https://help.ubuntu.com/community/Repositories/CommandLine)  

Bu işlemi yaptıktan sonra, paket önbelleğinizi güncelleyin:  

```bash
sudo apt update
```

Ardından `netperf` aracını şu şekilde yükleyin:  

```bash
sudo apt install netperf
```

Çıktıda, bu paketin Multiverse'den geldiğini göreceksiniz.

## EKSTRA: Ubuntu PPA'ları

Ubuntu, kullanıcıların kendi **Kişisel Paket Arşivlerini (PPA)** oluşturmalarına da izin verir. Bunlar genellikle en güncel yazılımları içerir.  

Örneğin, `neofetch` aracını yükleyip çalıştırın. Bu araç, sistem yapılandırmanızı ve donanımınızı özetler. Mevcut sürümü görmek için:  

```bash
neofetch --version
```

Daha güncel bir sürüm istiyorsanız şu PPA’yı ekleyebilirsiniz:  

```bash
sudo add-apt-repository ppa:ubuntusway-dev/dev
```

Depoyu ekledikten sonra önbelleği güncelleyin:  

```bash
sudo apt update
```

Ardından `neofetch` paketini yükleyin:  

```bash
sudo apt install neofetch
```

Paketin sürüm bilgilerini kontrol edin:  

```bash
neofetch --version
apt-cache show neofetch
```

Yeni sürümler sık sık çıkabilir. Ancak, geliştirme sürecindeki hatalar nedeniyle bazen yazılımın çalışmaması da mümkündür.

## ÖZET

Varsayılan depolardan yükleme yapmak en güvenli yoldur, ancak bazen ekstra kaynaklara ihtiyaç duyabilirsiniz. Bir sistem yöneticisi olarak riskleri değerlendirmeniz önemlidir. Genel olarak:  

* Bir veya iki ek depodan fazlasını eklemek için iyi bir nedeniniz olmalıdır.  
* Eklediğiniz her deponun potansiyel dezavantajlarını araştırmalısınız.  

## KAYNAKLAR

* [Paket Yönetim Komutları Karşılaştırması](https://wiki.archlinux.org/index.php/Pacman/Rosetta)  
* [Yum Kullanımına Giriş](http://fedoranews.org/tchung/howto/2003-11-09-yum-intro.shtml)  
* [APT ile Paket Yönetimi](https://help.ubuntu.com/community/AptGet/Howto)  
* [Özgür Yazılım Nedir?](http://www.debian.org/intro/free)  


---

