---
title: "Kısım 20 - Betik Yazma (Scripting)"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 20. Kısım - Betik Yazma (Scripting)

* [Tamamlayıcı video](https://youtu.be/G7GyMuyauVk)

## GİRİŞ

Bugün kursun son oturumundayız. Eğer tüm dersleri tamamladıysanız, kendinizi tebrik edin!

Bir sistem yöneticisi olarak, işleri mümkün olduğunca otomatikleştirmenin önemini gördünüz ve Linux’un oldukça “şeffaf” olduğunu, yani ne aradığınızı bildiğinizde her şeyi bulabileceğinizi öğrendiniz.

Bu son oturumda, sisteminizi yönetmek için kullanabileceğiniz küçük programlar veya “shell script”ler yazmayı öğreneceksiniz.

Linux komut satırına yazdığınız her komut, doğrudan “komut yorumlayıcısı” yani “kabuk” (shell) ile iletişim kurar. Genellikle bu kabuk _bash_ olur, bu yüzden komutları bir araya getirerek oluşturduğunuz betikler “shell script” veya “bash script” olarak adlandırılır.

Peki, neden komutları elle yazmak yerine bir betik oluşturalım?

* **Zamandan tasarruf**. Logları ararken kullandığımız uzun `grep`, `cut` ve `sort` komut zincirini hatırlıyor musunuz? Böyle işlemleri tekrar tekrar yapmanız gerekiyorsa, bunları bir betik haline getirmek yazım hatalarını önler ve zaman kazandırır.
* **Parametreler**. Bir betik, sağladığınız parametrelere göre farklı işler yapabilir.
* **Otomasyon**. Betiğinizi _/etc/cron.daily_ dizinine koyarsanız her gün çalışır veya uygun bir _/etc/rc.d_ dizininde sembolik bağlantı (symlink) kurarsanız, sistem her açıldığında veya kapandığında çalıştırabilirsiniz.

## BUGÜNKÜ GÖREVLERİNİZ

* Sunucunuza giriş yapmaya çalışan en üst 3 IP adresini listeleyen kısa bir betik yazın.

## İLK ADIM: SHEBANG!

Betikler, basit metin dosyalarıdır. Ancak "çalıştırılabilir" izinler verdiğinizde, sistem dosyanın başındaki “#!” karakterleriyle başlayan özel satırı arar. Bu satıra "shebang" veya "crunchbang" denir.

Örneğin:

```
#!/bin/bash
```

Normalde “#” ile başlayan satırlar yorum satırı olarak kabul edilir, ancak ilk satırda ve “!” ile birlikte kullanıldığında, _“bu dosyayı /bin/bash programına gönder ve betik olarak çalıştır”_ anlamına gelir. Betiklerinizi _bash_ dilinde yazacağız, ancak Perl veya Python gibi farklı betik dilleri de kullanılabilir. Örneğin, Perl betiği `#!/usr/bin/perl` ile, Python betiği ise `#!/usr/bin/env python3` ile başlayabilir.

## İLK BETİĞİNİZ

Sunucunuzda başarısız oturum açma girişimlerini listeleyen küçük bir betik yazın. Aşağıdaki içeriği, ana dizininizde `attacker` adlı bir dosyaya yazın:

```
#!/bin/bash
#
#   attacker - son başarısız giriş girişimini gösterir
#
echo "Son başarısız giriş girişimi şu IP adresinden geldi:"
grep -i "disconnected from" /var/log/auth.log | tail -1 | cut -d: -f4 | cut -f7 -d" "
```

Betiğinizin başına yorum eklemek zorunlu olmasa da iyi bir alışkanlıktır.

Betiği çalıştırılabilir yapmak için:

```
chmod +x attacker
```

Ardından betiği şu şekilde çalıştırabilirsiniz:

```
/home/support/attacker
```

veya:

```
./attacker
```

Betik düzgün çalıştığında, daha kolay erişim sağlamak için şu komutu kullanarak betiği `$PATH` üzerinde bir yere taşıyın:

```
sudo mv attacker /usr/local/bin/attacker
```

Artık sadece `attacker` yazarak betiği çalıştırabilirsiniz.

## BETİĞİ GENİŞLETME

Betiği, bir parametre gerektirecek şekilde genişletebilirsiniz. Aşağıdaki betik, parametre verilmediğinde kullanım bilgisi sağlar:

```
#
##   topattack - en ısrarcı saldırganları listele
#
if [ -z "$1" ]; then
  echo -e "\nKullanım: `basename $0` <sayı> - En çok saldırıda bulunan <sayı> IP'yi listeler"
  exit 0
fi
echo " "
echo "Son zamanlardaki ısrarcı saldırganlar"
echo " "
echo "Deneme Sayısı     IP"
echo "-----------------------"
grep "Disconnected from authenticating user root" /var/log/auth.log | cut -d: -f4 | cut -d" " -f7 | sort | uniq -c | sort -nr | head -$1
```

Bu betiği `"topattack"` olarak kaydedin, çalıştırılabilir yapın ve ardından _/usr/local/bin_ dizinine taşıyın. 

Bu IP adreslerinin ayrıntılarını öğrenmek için `whois` komutunu kullanabilirsiniz, ancak saldırgan sistemin masum bir şekilde ele geçirilmiş olabileceğini unutmayın.

Bu tür basit betikler, yönetici görevlerinizi daha hızlı, kolay ve hatasız yapmanıza yardımcı olabilir.

Otomasyon ve betik yazma hoşunuza gittiyse, makinelerinizi ve hizmetlerinizi yapılandırmak için bash betiklerinin ötesine geçmek isteyebilirsiniz. Ansible, CloudInit veya Terraform gibi orkestrasyon araçlarını araştırmak faydalı olabilir.

Ve evet, bu kursun son dersiydi! Artık öğrendiklerinizle neler yapmayı planladığınızı ve kurs hakkındaki düşüncelerinizi bizimle paylaşabilirsiniz.

## KAYNAKLAR

* [Bash Betikleri Öğren - Eğitim Videosu](http://www.youtube.com/watch?v=QGvvJO5UIs4)  
* [Bash betik eğitimi](http://linuxconfig.org/Bash_scripting_Tutorial)  
* [BASH Programlama - Giriş HOW-TO](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html)  
* [Nasıl İyi (ve Tembel) Bir Sistem Yöneticisi Olunur](http://www.linuxjournal.com/content/how-be-good-and-lazy-system-administrator)

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyebilirsiniz.

---

