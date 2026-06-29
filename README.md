# Mobil Destekli Anemi Tespiti Uygulaması

Bu proje, el ayası (palm), tırnak (nail) ve göz konjonktivası (conjunctiva) görüntülerini kullanarak anemi riskini tahmin eden mobil destekli bir makine öğrenmesi sistemidir.

## Proje Amacı

Anemi, kandaki hemoglobin seviyesinin düşmesiyle ortaya çıkan ve erken teşhis edilmediğinde ciddi sağlık sorunlarına yol açabilen bir durumdur. Bu proje, invaziv olmayan bir şekilde mobil cihaz üzerinden hızlı ön değerlendirme yapmayı amaçlamaktadır.

## Sistem Özeti

Sistem üç farklı biyolojik bölgeden alınan görüntüler üzerinden çalışır:

- El ayası (Palm)
- Tırnak (Nail)
- Göz konjonktivası (Conjunctiva)

Bu görüntülerden özellikler çıkarılır, makine öğrenmesi modelleri ile analiz edilir ve sonuçlar birleştirilerek nihai anemi riski hesaplanır.

## Çalışma Akışı

1. Görüntü yükleme (mobil uygulama)
2. ROI (Region of Interest) çıkarımı
3. Özellik çıkarımı
4. Model ile tahmin
5. Olasılıkların ağırlıklı birleştirilmesi
6. Nihai sonuç üretimi

## Kullanılan Teknolojiler

- Python
- OpenCV
- NumPy
- Scikit-learn
- XGBoost
- FastAPI
- React Native
- Cloudinary
- Joblib

## Model Yapısı

Her bölge için ayrı model eğitilmiştir:

| Bölge | Model |
|------|------|
| Palm | HistGradientBoosting + Calibration |
| Nail | HistGradientBoosting + Calibration |
| Conjunctiva | XGBoost + Calibration |

## Özellik Çıkarma

Her görüntüden aşağıdaki özellikler çıkarılmıştır:

- RGB, HSV ve LAB renk uzayı istatistikleri
- Ortalama ve standart sapma değerleri
- Percentile değerleri
- Kanal oranları
- Gri seviye istatistikleri

## Sonuçların Birleştirilmesi

Modellerin çıktıları ağırlıklı ortalama ile birleştirilir:

- Palm: 0.45
- Nail: 0.35
- Conjunctiva: 0.20

Final skor ≥ 0.5 ise “Anemi riski var” olarak sınıflandırılır.

## Mobil Uygulama

React Native ile geliştirilmiş mobil uygulama üzerinden kullanıcılar:

- Görüntü yükleyebilir
- Sonuçları anlık görebilir
- Eksik veri durumunda bilgilendirilir

## API

Backend tarafı FastAPI ile geliştirilmiştir. Model tahminleri API üzerinden mobil uygulamaya aktarılır.

## Not

Bu sistem tıbbi tanı koymaz, yalnızca ön değerlendirme amacıyla geliştirilmiştir.# anemia-app
