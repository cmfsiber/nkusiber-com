---
title: "Kısım 04 - Yazılım Kurulumu ve Dosya Yapısının Keşfi"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 4. Kısım - Yazılım Kurulumu ve Dosya Yapısının Keşfi

* [Ders videosu](https://youtu.be/d8JzxgGNAx4)

## GİRİŞ

Bir sistem yöneticisi olarak temel görevlerinizden biri, gerektiğinde yeni yazılımlar kurmaktır. Ayrıca, bir Linux sistemindeki standart dizinlerin yapısına çok aşina olmanız gerekecek.

Bugünkü oturumda her iki konuda da pratik yapacaksınız.

## BUGÜNKÜ GÖREVLERİNİZ

* Çevrimiçi depolardan yeni bir uygulama kurun  
* Bazı standart dizinlerle aşinalık kazanın  
* Bazı yapılandırma dosyalarının formatına ve içeriğine bakın  

Akıllı telefonlardaki "uygulama mağazası" veya "market" sistemini kullandıysanız, standart depolardan Linux yazılımı kurulumunu hemen anlayacaksınız. Bir paketin (=uygulamanın) adını veya açıklamasını bildiğimiz sürece, şu komutla arama yapabiliriz:

```bash
apt search "midnight commander"
```

Bu komut, eşleşen "paketlerin" bir listesini gösterecektir ve ardından `apt install` komutuyla bunları kurabiliriz. Örneğin, Ubuntu’da `mc` (Midnight Commander) paketini kurmak için:

```bash
sudo apt install mc
```

(Eğer zaten `root` kullanıcısı olarak oturum açmadıysanız, kurulum komutlarından önce `sudo` kullanmanız gerekir – çünkü sıradan bir kullanıcı, tüm sunucuyu etkileyebilecek yazılımları kuramaz.)

`mc` yüklendikten sonra, sadece `mc` yazıp *Enter* tuşuna basarak başlatabilirsiniz.

Bu, "klasik" bir Unix uygulaması değildir, ancak retro arayüzüne alıştıktan sonra gezinmenin oldukça kolay olduğunu göreceksiniz. Şimdi şu dizinleri inceleyin:

`/root`  
`/home`  
`/sbin`  
`/etc`  
`/var/log`

...ve aşağıdaki Kaynaklar bölümündeki bağlantıları kullanarak bu dizinlerin nasıl kullanıldığını öğrenmeye başlayın. Bu hiyerarşi hakkında daha fazla bilgi edinmek için terminalde `man hier` komutunu da kullanabilirsiniz.

Ana yapılandırma dosyalarının çoğu `/etc` dizininde ve onun alt dizinlerinde tutulur. Bu dosyalar ve `/var/log` altındaki günlükler genellikle basit metin dosyalarıdır. Önümüzdeki günlerde bu dosyalarla çok fazla zaman geçireceksiniz – ama şimdilik F3 tuşunu kullanarak içeriklerine göz atın.

İncelemeniz için bazı ilginç dosyalar: `/etc/passwd`, `/etc/ssh/sshd_config` ve `/var/log/auth.log`

Bir dosyadan çıkmak için yine F3’e basın.

`mc`'den çıkmak için F10 tuşuna basabilirsiniz, ancak fare kullanarak da seçim yapmanız gerekebilir.

(Bir Apple Mac'te Terminal kullanıyorsanız, F3 için ESC+3 ve F10 için ESC+0 kombinasyonlarını kullanmanız gerekebilir.)

Şimdi `apt search` komutunu kullanarak başka paketler arayın ve kurun: “hangman” aramasını deneyin. Muhtemelen `bsdgames` adlı bir paketin içinde eski bir metin tabanlı sürümü bulacaksınız. Kurun ve birkaç tur oynayın...

## İlerleme Paylaşımı

* İlerlemenizi, yorumlarınızı ve sorularınızı foruma gönderin.

## EK GÖREV

* `mc` kullanarak `/etc/apt/sources.list.d/ubuntu.sources` dosyasını görüntüleyin; burada depoların gerçek konumları belirtilmiştir. Çoğu zaman, bu konumlar sunucunuza daha yakın olan “aynalar” (mirror) olacaktır.
* [Depolar - Komut Satırı](https://help.ubuntu.com/community/Repositories/CommandLine) bağlantısını okuyarak detaylı bilgi edinin.

## KAYNAKLAR

* [apt ve apt-get Farkı Açıklandı](https://itsfoss.com/apt-vs-apt-get-difference/)  
* [DNF ve APT: Benzerlikler ve Farklar](https://embeddedinventor.com/dnf-vs-apt-similarities-and-diffs-analyzed)  
* [Ubuntu Sunucu Kılavuzu - Paket Yönetimi](https://ubuntu.com/server/docs/package-management)  
* [Midnight Commander vs Ranger](https://www.slant.co/versus/6822/7576/~midnight-commander_vs_ranger)  
* [Linux Dizin Yapısı Açıklandı](https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/)

Bazı haklar saklıdır. Lisans şartlarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) kontrol edin.

