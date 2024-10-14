---
title: "Kısım 09 - Ağ Kurulumuna Dalış"
draft: false
date: 2024-10-13
authors:
 - "yigit-altinay"
---

# 9. Kısım - Ağ Kurulumuna Dalış

* [Ders videosu](https://youtu.be/47BWW-SyAa8)

## GİRİŞ

Sunucunuz şu anda uzaktan giriş için *sshd* ve web erişimi için *apache2* hizmetlerini çalıştırıyor. Bu hizmetler, TCP/IP "portları" 22 ve 80 üzerinden "dünyaya açık" durumda.  

Bir sistem yöneticisi olarak, sunucularınızdaki açık portları bilmelisiniz çünkü her açık port potansiyel bir saldırı alanıdır. Uygun izleme ve kontrol mekanizmalarını uygulayabilmelisiniz.  

## BUGÜNKÜ GÖREVLERİNİZ

* Web sunucunuzu bir güvenlik duvarı kullanarak güvenli hale getirin.

## TALİMATLAR

Öncelikle, sunucunuzda hangi portların açık olduğunu belirlemenin birkaç yoluna göz atalım:  

* `ss` - "socket status" (soket durumu) anlamına gelir ve eski *netstat* aracının yerini almıştır.  
* `nmap` - Bu "port tarayıcısı" genellikle varsayılan olarak yüklü gelmez.  

*ss* komutuyla çok çeşitli seçenekler kullanılabilir, ancak öncelikle şu komutu deneyin:  

```bash
ss -ltpn
```

Komut çıktısı, hangi arayüzlerde hangi portların açık olduğunu gösterir:

```bash
sudo ss -ltp
State   Recv-Q  Send-Q   Local Address:Port     Peer Address:Port  Process
LISTEN  0       4096     127.0.0.53%lo:53        0.0.0.0:*      users:(("systemd-resolve",pid=364,fd=13))
LISTEN  0       128            0.0.0.0:22           0.0.0.0:*      users:(("sshd",pid=625,fd=3))
LISTEN  0       128               [::]:22              [::]:*      users:(("sshd",pid=625,fd=4))
LISTEN  0       511                  *:80                *:*      users:(("apache2",pid=106630,fd=4),("apache2",pid=106629,fd=4),("apache2",pid=106627,fd=4))
```

Bu çıktı, 80 ve 22 numaralı portların tüm yerel IP adresleri üzerinden "dünyaya açık" olduğunu ve 53 numaralı portun (DNS) yalnızca yerel bir adreste açık olduğunu gösterir.

Şimdi `nmap` aracını şu komutla yükleyin:  

```bash
apt install nmap
```

Bu araç farklı çalışır: 1.000’den fazla portu etkin bir şekilde tarar ve açık olup olmadıklarını kontrol eder. Genellikle uzak makineleri taramak için kullanılır - bunu yapmayın - ancak kendi sunucunuzu kontrol etmek için çok kullanışlıdır:

```bash
nmap localhost
```

Örnek çıktı:  

```bash
Starting Nmap 5.21 ( http://nmap.org ) at 2013-03-17 02:18 UTC
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00042s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 0.08 seconds
```

22 numaralı port *ssh* hizmetini sağlıyor, bu yüzden açık olacak. Apache çalışıyorsa, 80 numaralı port (http) da açık olacaktır. Her açık port, "saldırı yüzeyini" artırır. Bu nedenle, ihtiyaç duymadığınız hizmetleri kapatmak en iyi uygulamadır.  

Ancak "localhost" (127.0.0.1) döngüsel ağ cihazıdır. *Yalnızca* buna bağlı hizmetler sadece yerel makinede kullanılabilir. Gerçekte dış dünyaya neyin açık olduğunu görmek için önce `ip a` komutunu kullanarak ağ kartınızın IP adresini bulun ve ardından bu adresi `nmap` ile tarayın.  

## Sunucu Güvenlik Duvarı

Linux çekirdeği, "netfilter" adlı yerleşik bir güvenlik duvarı işlevine sahiptir. Bunu *iptables* veya daha yeni *nftables* gibi araçlarla yapılandırır ve sorgularız. Bunlar güçlü ancak karmaşıktır - bu yüzden daha kullanıcı dostu bir alternatif olan *ufw* (uncomplicated firewall) kullanacağız.  

Öncelikle şu komutla mevcut kuralları listeleyin:  

```bash
sudo iptables -L
```

Örnek çıktı:

```bash
Chain INPUT (policy ACCEPT)
target  prot opt source             destination

Chain FORWARD (policy ACCEPT)
target  prot opt source             destination

Chain OUTPUT (policy ACCEPT)
target  prot opt source             destination
```

Yani, herhangi bir trafik kabul ediliyor.  

*ufw* kullanımı çok basittir. Ubuntu 8.04 LTS sonrası sürümlerde varsayılan olarak mevcuttur, ancak yüklemeniz gerekirse:

```bash
sudo apt install ufw
```

SSH’ye izin verip HTTP’ye izin vermemek için:

```bash
sudo ufw allow ssh
sudo ufw deny http
```

**DİKKAT!** SSH’ye açıkça izin vermeyi unutmayın, yoksa sunucunuza erişiminizi kaybedersiniz! İzin verilmezse güvenlik duvarı varsayılan olarak portu reddeder.  

Bu ayarları etkinleştirin:

```bash
sudo ufw enable
```

Şimdi `sudo iptables -L` komutunu çalıştırarak ayrıntılı kuralları görebilirsiniz. Çıktıda şu kurallardan biri olmalıdır:

```
DROP       tcp  --  anywhere             anywhere             tcp dpt:http
```

Bu, Apache hala çalışıyor olsa da artık "dış dünya" tarafından erişilemez olacağı anlamına gelir. Tüm gelen http/80 trafiği reddedilecektir. Bunu test edin! Muhtemelen şu komutlarla işlemi geri almak isteyeceksiniz:  

```bash
sudo ufw allow http
sudo ufw enable
```

Gereksiz hizmetleri kapatmak genellikle yeterli bir koruma sağlar, ancak güvenlik duvarı ihtiyacı, yapılandırdığınız sunucunun türüne bağlıdır. Umarım bu oturum size temel kavramları anlamada yardımcı olmuştur.  

Bu test/öğrenme sunucusu için http/80 erişimini tekrar açın. Böylece `access.log` dosyalarıyla gerçek bir sunucuyu yönetmenin nasıl bir şey olduğunu deneyimleyebilirsiniz.  

## Standart Dışı Portlar Kullanmak

Bazı durumlarda hizmetleri standart olmayan portlarda sunmak mantıklı olabilir. Örneğin **ssh/22** için bu yaygın bir öneridir ve `/etc/ssh/sshd_config` dosyasında yapılandırılarak gerçekleştirilir.  

Bazıları bunu "gizlilik yoluyla güvenlik" olarak adlandırır. Ancak bu yöntem, rastgele saldırıları etkili bir şekilde önler. Yine de, AWS kullanıyorsanız ve SSH portunu 2222 olarak değiştirirseniz, EC2 güvenlik grubunuzda bu portu açmanız gerektiğini unutmayın.  

## Genişletme

Erişim engellendikten sonra bile kimin giriş yapmaya çalıştığını bilmek yararlı olabilir. Aşağıdaki tartışmalara göz atın:  

* [İptables ile Reddedilen Paketleri Loglamak](http://www.thegeekstuff.com/2012/08/iptables-log-packets/)  
* [Iptables Nasıl Kullanılır](https://help.ubuntu.com/community/IptablesHowTo)  

## KAYNAKLAR

- [Linux Ağ Bağlantılarını İzlemek için ss Komut Örnekleri](https://www.tecmint.com/ss-command-examples-in-linux/)  
- [UFW - Basit Güvenlik Duvarı](https://help.ubuntu.com/community/UFW)  
- [Linux Güvenlik Duvarı Kuralları](http://linuxconfig.org/collection-of-basic-linux-firewall-iptables-rules)  
- [Netstat Komut Örnekleri](http://www.thegeekstuff.com/2010/03/netstat-command-examples/)  

