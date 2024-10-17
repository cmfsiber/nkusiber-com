---
title: "Kısım 19 - Inode'lar, Sembolik Bağlantılar ve Diğer Kısayollar"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---
# 19. Kısım - Inode'lar, Sembolik Bağlantılar ve Diğer Kısayollar

* [Tamamlayıcı video](https://youtu.be/3WrBVRaNCqQ)

## GİRİŞ

Bugünkü konumuz, dosyaların nasıl depolandığıyla ilgili teknik detaylara bir göz atmamızı sağlıyor.  

Linux, birçok farklı “dosya sistemini” destekler – ancak bir sunucuda genellikle _ext3_, _ext4_ ve belki de _btrfs_ ile uğraşırsınız. Ancak bugün bu dosya sistemleriyle değil, onların _üzerinde_ yer alan Linux Sanal Dosya Sistemi (VFS) ile ilgileneceğiz.

VFS, Linux’un önemli bir parçasıdır ve bunu ve çevresindeki kavramları anlamak, bir sistemi güvenle yönetmek açısından oldukça faydalıdır.

## BUGÜNKÜ GÖREVLERİNİZ

* Bir sabit bağlantı (hard link) oluşturun  
* Bir sembolik bağlantı (soft link) oluşturun  
* Alias (takma ad) oluşturun  

## DAHA DERİNE İNMEK

Linux, dosya adları ile diskteki veriler arasında ekstra bir katmana sahiptir - bu katman _inode_ olarak adlandırılır. Bir inode, sayısal bir değerdir ve bunu iki şekilde görebilirsiniz:

`ls` komutunun `-i` parametresiyle:

```
ls -li /etc/hosts
35356766 -rw------- 1 root root 260 Nov 25 04:59 /etc/hosts
```

veya `stat` komutuyla:

```
stat /etc/hosts
File: `/etc/hosts'
Size: 260           Blocks: 8           IO Block: 4096   regular file
Device: 2ch/44d     Inode: 35356766     Links: 1
Access: (0600/-rw-------)  Uid: (  0/   root)   Gid: (	0/	root)
Access: 2012-11-28 13:09:10.000000000 +0400
Modify: 2012-11-25 04:59:55.000000000 +0400
Change: 2012-11-25 04:59:55.000000000 +0400
```

Her dosya adı bir inode’a işaret eder ve inode, diskteki gerçek veriye işaret eder. Bu nedenle, birden fazla dosya adı aynı inode’a işaret edebilir ve böylece aynı içeriğe sahip olabilir. Bu yönteme "sabit bağlantı" (hard link) denir. İzinler, sahiplik ve tarih gibi bilgiler, dosya adı düzeyinde değil, inode düzeyinde tutulur. Bu fark çoğu zaman teorik olsa da önemli durumlarda fark yaratabilir.

## İKİ ÇEŞİT BAĞLANTI

Aşağıdaki adımlarla sabit ve sembolik bağlantıları nasıl oluşturacağınızı öğrenin:

Öncelikle, ana dizininize geçin:

`cd`

Sonra, `ln` komutunu kullanarak bir sabit bağlantı oluşturun:

```
ln /etc/passwd link1
```

Ardından, bir sembolik bağlantı (symlink) oluşturun:

```
ln -s /etc/passwd link2
```

`ls -li` komutuyla oluşturulan dosyaları görüntüleyin ve `less` veya `cat` komutlarıyla içeriği inceleyin.

Symlink'lerin izinleri genellikle her şeye izin verir gibi görünür, ancak önemli olan, bağlandıkları dosyanın izinleridir.

Her iki bağlantı türü de Linux’ta yaygın olarak kullanılır, ancak symlink'ler özellikle yaygındır. Örneğin:

```
ls -ltr /etc/rc2.d/*
```

Bu dizin, makineniz "çalışma seviyesi 2" (normal çalışma durumu) moduna geçtiğinde başlatılacak betikleri içerir. Ancak çoğu aslında _/etc/init.d_ dizinindeki gerçek betiklere sembolik bağlantıdır.

Ayrıca, aşağıdaki gibi bir yapı da sık karşılaşılan bir durumdur:

```
prog
prog-v3
prog-v4
```

Burada "prog" programı, başlangıçta v3 sürümüne bağlanmış bir symlink’tir, ancak artık v4’e işaret etmektedir (ve gerektiğinde tekrar v3’e yönlendirilebilir).

Sağlanan kaynaklardan daha fazla bilgi edinin ve sunucunuzda test ederek bağlantı türleri arasındaki farkları anlamaya çalışın. Özellikle, sembolik bağlantılarla sabit bağlantılar veya basit dosyalar arasındaki izin ve dosya boyutu farklarına dikkat edin.

## FARKLAR

**Sabit bağlantılar:**
* Sadece dosyalara bağlanır, dizinlere bağlanmaz.  
* Farklı diskler veya bölümler üzerinde dosyaya bağlanamaz.  
* Dosya taşınsa bile bağlantı çalışmaya devam eder.  
* Inode ve fiziksel disk konumlarına işaret eder.  

**Sembolik (yumuşak) bağlantılar:**
* Dizinlere de bağlanabilir.  
* Farklı diskler veya bölümler üzerindeki dosyalara bağlanabilir.  
* Orijinal dosya silinse bile bağlantı kalır.  
* Ancak, dosya taşınırsa bağlantı artık çalışmaz.  
* Fiziksel konumlara değil, soyut dosya/dizin adlarına işaret eder.  
* Kendine ait bir inode’u vardır.  

## EKSTRA

* [Linux dosya sisteminin anatomisi](https://developer.ibm.com/tutorials/l-linux-filesystem/)

## KAYNAKLAR

* [Sabit ve yumuşak bağlantılar](http://linuxgazette.net/105/pitcher.html)  
* [Linux inode’ları açıklandı](https://youtu.be/6KjMlm8hhFA)  
* [Linux'ta inode’lar hakkında bilmek istediğiniz her şey](https://www.howtogeek.com/465350/everything-you-ever-wanted-to-know-about-inodes-on-linux/)  

Bazı haklar saklıdır. Lisans koşullarını [buradan](https://github.com/livialima/linuxupskillchallenge/blob/master/LICENSE) inceleyebilirsiniz.

---

