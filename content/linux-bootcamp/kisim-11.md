---
title: "Kısım 11 - Bir şeyler bulmak..."
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 11. Kısım - Bir şeyler bulmak...

* [Ders videosu](https://youtu.be/gQ9nP9PN8KA)  
* [Tamamlayıcı video](https://www.youtube.com/live/2lYo_FJxQR8?feature=shared)

## GİRİŞ

Bugün, dosyaları ve içerdikleri metinleri hızlı ve verimli bir şekilde nasıl bulacağınızı inceleyeceğiz.  

Bir dosyanın ya da ayarın var olduğunu bilmek, ancak bulamamak çok sinir bozucu olabilir! Bugünkü komutlara hakim olarak sistemlerinizi yönetirken çok daha özgüvenli olacaksınız.

Bugün kullanacağımız faydalı araçlar:  

* `locate`  
* `find`  
* `grep`  
* `which`

## BUGÜNKÜ GÖREVLERİNİZ

* "Permission" kelimesini içeren tüm dosyaları bulun.

## TALİMATLAR

### _locate_

`access.log` adlı bir dosya arıyorsanız, en hızlı yöntem `locate` komutunu şu şekilde kullanmaktır:  

```bash
$ locate access.log
/var/log/apache2/access.log
/var/log/apache2/access.log.1
/var/log/apache2/access.log.2.gz
```

(`locate` yüklü değilse `sudo apt install mlocate` komutuyla yükleyin.)  

Gördüğünüz gibi, varsayılan olarak aramayı _"\*something\*"_ biçiminde yapar. `locate` komutu çok hızlıdır çünkü bir dizini tarar. Ancak, bu dizin güncel değilse ya da eksikse aradığınız dosya bulunamayabilir. Dizini manuel olarak güncellemek için:  

```bash
sudo updatedb
```

### _find_

`find` komutu, bir dizin yapısı içinde belirli kriterlere uyan dosyaları arar. Bu kriterler dosya adı, boyut ya da son değiştirilme tarihi gibi özellikler olabilir. Örneğin:  

```bash
find /var -name access.log
find /home -mtime -3
```

İlk komut "access.log" adında dosyaları arar, ikincisi ise `/home` dizininde son 3 gün içinde değiştirilmiş dosyaları arar.  

`find` komutu, dizini taradığı için `locate` kadar hızlı değildir ve aramayı yapan kullanıcının izinleri nedeniyle bazı dizinlerde "permission denied" (izin reddedildi) hataları verebilir. Tüm sistemi taramak için `sudo` kullanabilirsiniz:  

```bash
sudo find /var -name access.log 2>&1 | grep -vi "Permission denied"
```

Bu sadece `find` komutunun temel bir örneğidir. Daha fazla bilgi için KAYNAKLAR bölümündeki makalelere göz atın ve olabildiğince çok örnek üzerinde çalışın.

### _grep -R_

`grep` komutunu belirli bir dosya yerine tüm bir dizin yapısı içinde çalıştırabilir ve rekürsif olarak (alt dizinler dahil) arama yapabilirsiniz. Örneğin, "PermitRootLogin" parametresini `/etc` dizininde arayın:

```bash
grep -R -i "PermitRootLogin" /etc/*
```

Bu komut, büyük-küçük harf duyarsız arama yapar (`-i` ile) ve dosyaları tararken sembolik bağlantıları da takip eder (`-R` ile).  

Eğer `/var/log/access.log.2.gz` gibi sıkıştırılmış günlük dosyalarınız varsa, bunları `zgrep` komutuyla arayabilirsiniz.

### _which_

Bazen bir komutun nereden çalıştırıldığını bilmek faydalıdır. Örneğin, `nano` komutunu çalıştırdığınızda, hangi dizinden yüklendiğini görmek için:  

```bash
which nano
```

Benzer şekilde, `grep`, `vi`, `service` ve `reboot` için de deneyebilirsiniz. Komutların genellikle `bin` adlı alt klasörlerde bulunduğunu fark edeceksiniz.

## GENİŞLETME

`find` komutunun `-exec` özelliği son derece güçlüdür. Ancak "bir şeyler bulmak" bundan çok daha fazlasını içerir! Bir dosyanın içeriğini bulmanın yanı sıra, kullanımını da `lsof` ve `fuser` gibi komutlarla takip edebilirsiniz.

Daha fazla örnek denemek için KAYNAKLAR bölümündeki bağlantılara göz atın.

## KAYNAKLAR

* [25 find komut örneği...](https://www.linuxtechi.com/25-find-command-examples-for-linux-beginners/)  
* [GNU find kullanımı için 10 ipucu](https://www.linux.com/tutorials/10-tips-using-gnu-find/)  
* [grep için beş basit tarif](http://arstechnica.com/open-source/news/2009/05/command-line-made-easy-five-simple-recipes-for-grep.ars)  
* [lsof komutunu kullanarak Linux sorunlarını giderme](https://www.redhat.com/sysadmin/analyze-processes-lsof)  
* [fuser komutu hakkında bilgi edinin](https://youtu.be/xF8uttDarG0)

## HATA GİDERME VE "MUTSUZ" BİR SUNUCUYU MUTLU ETME

Öğrendiklerinizi [SadServers.com](https://sadservers.com/) adresindeki bazı zorluklarda uygulayın:

* ["Saint John": Bu günlük dosyasına ne yazıyor?](https://sadservers.com/scenario/saint-john)

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyin. 

---
