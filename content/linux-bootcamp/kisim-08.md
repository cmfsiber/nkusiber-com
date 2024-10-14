---
title: "Kısım 08 - Meşhur \"grep\" ve Diğer Metin İşleme Araçları"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 8. Kısım - Meşhur "grep" ve Diğer Metin İşleme Araçları

* [Ders videosu](https://youtu.be/kG5JGJN5iTc)

## GİRİŞ

Sunucunuz artık iki hizmet çalıştırıyor: *sshd* (Secure Shell Daemon) hizmeti ve Apache2 web sunucusu. Siz ve başkaları sunucunuza eriştikçe, bu hizmetler log dosyaları oluşturur. Bu loglar, basit araçlarla analiz edebileceğiniz metin dosyalarıdır.

Düz metin dosyaları, "Unix yöntemi"nin temelidir ve bunları kolayca düzenlemek, sıralamak, aramak ve işlemek için birçok küçük "araç" vardır. Bugün, log dosyalarınızı dilimlemek ve analiz etmek için `grep`, `cat`, `more`, `less`, `cut`, `awk` ve `tail` komutlarını kullanacağız.

`grep` komutu, çok güçlü ve kullanışlı olduğu kadar, Unix/Linux'un tipik "teknik" isimlendirme tarzıyla da ünlüdür.

## BUGÜNKÜ GÖREVLERİNİZ

* Bir dosyanın tam içeriğini şu şekilde görüntüleyin:  
  cat /var/log/apache2/access.log
* Aynı dosyayı şu komutla açın:  
  less /var/log/apache2/access.log  
  Ok tuşlarıyla yukarı-aşağı hareket edin ve "q" ile çıkın.
* less kullanarak dosya içinde *gg*, *GG*, */*, *n* ve *N* ile gezinme pratiği yapın (dosyanın başına, sonuna gitmek, bir şey aramak ve sonraki veya önceki eşleşmeye atlamak için).
* `/var/log/auth.log` dosyasını less ile açarak son girişleri ve sudo kullanımlarını inceleyin.
* Dosyanın son birkaç satırını görüntüleyin:  
  tail /var/log/apache2/access.log  
  (Evet, ayrıca `head` komutu da var!)
* Bir log dosyasını gerçek zamanlı olarak izleyin:  
  tail -f /var/log/apache2/access.log  
  (Bu sırada tarayıcıdan sunucunuzun web sayfasına erişin.)
* Bir komutun çıktısını başka bir komuta "girdi" olarak iletmek için `|` (pipe) sembolünü kullanın.
* Örneğin, bir dosyanın çıktısını `cat` ile alıp `grep` ile arama terimi ile filtreleyin:  
  cat /var/log/auth.log | grep "authenticating"
* Bunu daha basit hale getirin:  
  grep "authenticating" /var/log/auth.log
* Piping (borulama) kullanarak aramanızı daraltın:  
  grep "authenticating" /var/log/auth.log | grep "root"
* `cut` komutunu kullanarak her satırın en ilginç kısımlarını seçin:  
  grep "authenticating" /var/log/auth.log | grep "root" | cut -f 10- -d" "  
  (10. alandan sonrasını seçer, burada alanlar arasındaki ayraç boşluk karakteridir). Bu yöntem, log verilerinden yararlı bilgileri çıkarmada oldukça faydalıdır.
* Seçimi tersine çevirmek için `-v` seçeneğini kullanın ve başka kullanıcılarla giriş denemelerini bulun:  
  grep "authenticating" /var/log/auth.log | grep -v "root" | cut -f 10- -d" "

Herhangi bir komutun çıktısını ">" operatörü ile bir dosyaya yönlendirebilirsiniz. Örneğin:  
ls -ltr > listing.txt  
Bu komut, dizin içeriğini ekranda listelemek yerine "listing.txt" dosyasına yönlendirir (dosya yoksa oluşturur, varsa içeriğini üzerine yazar).

## /VAR/LOG/AUTH.LOG NEREDE?

Eğer `/var/log/auth.log` dosyasını bulamadıysanız, muhtemelen minimal bir Ubuntu sürümü kullanıyorsunuzdur (örneğin, yerel bir sanal makine veya VPS üzerindeki bir sürüm). Minimal görüntüler, sadece systemd journal içerir ve varsayılan olarak eski syslog sistemiyle gelmez.

Endişelenmeyin! `sudo apt install rsyslog` komutuyla syslog'u geri yükleyin. Birkaç dakika bekleyin, dosya oluşturulacaktır.

Ayrıca, bu derste kullanılan bazı diğer programlar da eksik olabilir, ancak her zaman kurabilirsiniz.

## İLERLEMENİZİ PAYLAŞIN

*root* olarak başarısız giriş denemesi yapan tüm IP'leri listelemek için komutu yeniden çalıştırın ve bu sefer çıktıyı `>` operatörü ile `~/attackers.txt` dosyasına yönlendirin. Kursu alan diğer katılımcılarla karşılaştırmak ve "ne kadar saldırı aldığınızı" görmek eğlenceli olabilir!

## EK GÖREV

* `auth.log` üzerindeki filtrelemenizi genişletin ve yalnızca IP adreslerini seçin. Ardından, bunu `sort` ile sıralayın ve `uniq` ile benzersiz olanları listeleyin.
* `awk` ve `sed` komutlarını araştırın. Eğer `grep` ve `cut` ile yapamadığınız bir şey olursa, bu komutlara geçmeniz gerekebilir. "linux sed tricks" veya "awk one liners" gibi aramalarla birçok örnek bulabilirsiniz.
* `awk` ve `sed` ile en az bir basit ve faydalı numara öğrenmeyi hedefleyin.

## KAYNAKLAR

* [Metin işleme komutları](https://www.youtube.com/watch?v=nLa6jAbULe8&t=97s)  
* [OSTechNix grep eğitimi](https://www.ostechnix.com/the-grep-command-tutorial-with-examples-for-beginners/)  
* [GREP'in kökeni](https://www.youtube.com/watch?v=NTfOnGZUZDk)  
* [SED oneliners](https://edoras.sdsu.edu/doc/sed-oneliners.html)  
* [RegExr - Düzenli ifadeleri öğrenme, oluşturma ve test etme aracı](https://regexr.com/)  
* [explainshell.com - Komut satırı argümanlarını anlamanıza yardımcı olur](https://explainshell.com/)

## SORUN GİDERME VE MUTSUZ SUNUCULARI MUTLU ETME!

[Buradaki](https://sadservers.com/) zorluklarla öğrendiklerinizi pekiştirin:

* ["Saskatoon": IP sayımı](https://sadservers.com/scenario/saskatoon)  
* ["Komut Satırı Cinayetleri"](https://sadservers.com/scenario/command-line-murders)  

Bazı haklar saklıdır. Lisans şartlarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) kontrol edin.

