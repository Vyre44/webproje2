<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Müşteri hizmetleri</h3>
        <ul>
          <li><a href="#">Yardım Merkezi</a></li>
          <li><a href="#">Transaction Services Agreement for non-EU/UK Consumers</a></li>
          <li><a href="#">Terms and Conditions for EU/EEA/UK Consumers (Transactions)</a></li>
          <li><a href="#">Geri bildirim anketi</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Bizimle alışveriş yapın</h3>
        <ul>
          <li><a href="#">Üzleme yapma</a></li>
          <li><a href="#">Teslimat seçenekleri</a></li>
          <li><a href="#">Müşteri Koruma</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Bizimle çalışın</h3>
        <ul>
          <li><a href="#">Ortaklıklar</a></li>
          <li><a href="#">İş ortağı programı</a></li>
          <li><a href="#">DS Center</a></li>
          <li><a href="#">Satıcı girişi</a></li>
          <li><a href="#">中国卖家入驻</a></li>
          <li><a href="#">Çin dışı satıcı kayıt</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Şununla ödeyin:</h3>
        <div class="payment-methods">
          <h3>Ödeme Yöntemleri</h3>
          <div class="payment-icons">
            <span class="payment-icon">
              <font-awesome-icon :icon="['fab', 'cc-visa']" size="2x" />
            </span>
            <span class="payment-icon">
              <font-awesome-icon :icon="['fab', 'cc-mastercard']" size="2x" />
            </span>
            <span class="payment-icon">
              <font-awesome-icon :icon="['fab', 'cc-amex']" size="2x" />
            </span>
            <span class="payment-icon">
              <font-awesome-icon :icon="['fab', 'cc-discover']" size="2x" />
            </span>
            <span class="payment-icon">
              <font-awesome-icon :icon="['fab', 'apple-pay']" size="2x" />
            </span>
            <span class="payment-icon">
              <font-awesome-icon :icon="['fab', 'google-pay']" size="2x" />
            </span>
          </div>
        </div>
      </div>

      <div class="footer-section">
        <h3>Bağlantıda kal</h3>
        <div class="social-links">
          <a href="#" class="social-icon"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
          <a href="#" class="social-icon"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
          <a href="#" class="social-icon"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
          <a href="#" class="social-icon"><font-awesome-icon :icon="['fab', 'facebook-messenger']" /></a>
          <a href="#" class="social-icon"><font-awesome-icon :icon="['fab', 'whatsapp']" /></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-links">
        <div class="help-section">
          <h4>Help</h4>
          <div class="help-links">
            <a href="#">Yardım Merkezi</a> |
            <a href="#">Disputes & Reports</a> |
            <a href="#">Buyer Protection</a> |
            <a href="#">Fikri Mülkiyet Hakkı İhlali Bildir</a> |
            <a href="#">Regulated Information</a> |
            <a href="#">Integrity Compliance</a> |
            <a href="#">Şeffaflık merkezi</a> |
            <a href="#">Non-login complaint entrance</a>
          </div>
        </div>

        <div class="browse-section">
          <h4>Browse by Category</h4>
          <div class="browse-links">
            <a href="#">All Popular</a> |
            <a href="#">Product</a> |
            <a href="#">Promotion</a> |
            <a href="#">Low Price</a> |
            <a href="#">Great Value</a> |
            <a href="#">Reviews</a>
          </div>
        </div>

        <div class="language-section">
          <h4>AliExpress Multi-Language Sites</h4>
          <div class="language-links">
            <a href="#">Русский</a>, <a href="#">Portuguese</a>, <a href="#">Spanish</a>, <a href="#">French</a>,
            <a href="#">German</a>, <a href="#">Italian</a>, <a href="#">Dutch</a>, <a href="#">Turkish</a>,
            <a href="#">Japanese</a>, <a href="#">Korean</a>, <a href="#">Thai</a>, <a href="#">Vietnamese</a>,
            <a href="#">Arabic</a>, <a href="#">Hebrew</a>, <a href="#">Polish</a>
          </div>
        </div>

        <div class="group-section">
          <h4>Alibaba Group</h4>
          <div class="group-links">
            <a href="#">Alibaba Group Website</a>, <a href="#">AliExpress</a>, <a href="#">Alimama</a>,
            <a href="#">Alipay</a>, <a href="#">Fliggy</a>, <a href="#">Alibaba Cloud</a>,
            <a href="#">Alibaba International</a>, <a href="#">AliTelecom</a>, <a href="#">DingTalk</a>,
            <a href="#">Juhuasuan</a>, <a href="#">Taobao Marketplace</a>, <a href="#">Tmall</a>,
            <a href="#">Taobao Global</a>, <a href="#">AliOS</a>, <a href="#">1688</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faFacebookMessenger, 
  faWhatsapp,
  faCcVisa,
  faCcMastercard,
  faCcJcb
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faFacebookMessenger, 
  faWhatsapp,
  faCcVisa,
  faCcMastercard,
  faCcJcb
)
</script>

<style scoped>
.footer {
  background-color: #f8f8f8;
  padding: 40px 0;
  margin-top: 40px;
  border-top: 1px solid #e8e8e8;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  padding: 0 20px;
}

.footer-section h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 500;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-section ul li a:hover {
  color: #ff4747;
}

.payment-methods {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.payment-icons {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
}

.payment-icon {
  color: #666;
  transition: all 0.2s ease;
}

.payment-icon:hover {
  color: #FF4747;
  transform: translateY(-2px);
}

.payment-img {
  height: 30px;
  width: auto;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-icon {
  color: #666;
  font-size: 24px;
  transition: all 0.2s ease;
}

.social-icon:hover {
  color: #ff4747;
  transform: translateY(-2px);
}

.footer-bottom {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 20px;
  border-top: 1px solid #e8e8e8;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.help-section,
.browse-section,
.language-section,
.group-section {
  margin-bottom: 15px;
}

.help-section h4,
.browse-section h4,
.language-section h4,
.group-section h4 {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.help-links,
.browse-links,
.language-links,
.group-links {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}

.help-links a,
.browse-links a,
.language-links a,
.group-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.help-links a:hover,
.browse-links a:hover,
.language-links a:hover,
.group-links a:hover {
  color: #ff4747;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .payment-methods,
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style> 