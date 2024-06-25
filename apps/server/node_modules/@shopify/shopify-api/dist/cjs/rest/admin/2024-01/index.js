'use strict';

var abandoned_checkout = require('./abandoned_checkout.js');
var access_scope = require('./access_scope.js');
var apple_pay_certificate = require('./apple_pay_certificate.js');
var application_charge = require('./application_charge.js');
var application_credit = require('./application_credit.js');
var article = require('./article.js');
var asset = require('./asset.js');
var assigned_fulfillment_order = require('./assigned_fulfillment_order.js');
var balance = require('./balance.js');
var blog = require('./blog.js');
var cancellation_request = require('./cancellation_request.js');
var carrier_service = require('./carrier_service.js');
var checkout = require('./checkout.js');
var collect = require('./collect.js');
var collection = require('./collection.js');
var collection_listing = require('./collection_listing.js');
var comment = require('./comment.js');
var country = require('./country.js');
var currency = require('./currency.js');
var custom_collection = require('./custom_collection.js');
var customer = require('./customer.js');
var customer_address = require('./customer_address.js');
var deprecated_api_call = require('./deprecated_api_call.js');
var discount_code = require('./discount_code.js');
var dispute = require('./dispute.js');
var dispute_evidence = require('./dispute_evidence.js');
var dispute_file_upload = require('./dispute_file_upload.js');
var draft_order = require('./draft_order.js');
var event = require('./event.js');
var fulfillment = require('./fulfillment.js');
var fulfillment_event = require('./fulfillment_event.js');
var fulfillment_order = require('./fulfillment_order.js');
var fulfillment_request = require('./fulfillment_request.js');
var fulfillment_service = require('./fulfillment_service.js');
var gift_card = require('./gift_card.js');
var gift_card_adjustment = require('./gift_card_adjustment.js');
var image = require('./image.js');
var inventory_item = require('./inventory_item.js');
var inventory_level = require('./inventory_level.js');
var location = require('./location.js');
var locations_for_move = require('./locations_for_move.js');
var marketing_event = require('./marketing_event.js');
var metafield = require('./metafield.js');
var mobile_platform_application = require('./mobile_platform_application.js');
var order = require('./order.js');
var order_risk = require('./order_risk.js');
var page = require('./page.js');
var payment = require('./payment.js');
var payment_gateway = require('./payment_gateway.js');
var payment_transaction = require('./payment_transaction.js');
var payout = require('./payout.js');
var policy = require('./policy.js');
var price_rule = require('./price_rule.js');
var product = require('./product.js');
var product_listing = require('./product_listing.js');
var product_resource_feedback = require('./product_resource_feedback.js');
var province = require('./province.js');
var recurring_application_charge = require('./recurring_application_charge.js');
var redirect = require('./redirect.js');
var refund = require('./refund.js');
var report = require('./report.js');
var resource_feedback = require('./resource_feedback.js');
var script_tag = require('./script_tag.js');
var shipping_zone = require('./shipping_zone.js');
var shop = require('./shop.js');
var smart_collection = require('./smart_collection.js');
var storefront_access_token = require('./storefront_access_token.js');
var tender_transaction = require('./tender_transaction.js');
var theme = require('./theme.js');
var transaction = require('./transaction.js');
var usage_charge = require('./usage_charge.js');
var user = require('./user.js');
var variant = require('./variant.js');
var webhook = require('./webhook.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
const restResources = {
    AbandonedCheckout: abandoned_checkout.AbandonedCheckout,
    AccessScope: access_scope.AccessScope,
    ApplePayCertificate: apple_pay_certificate.ApplePayCertificate,
    ApplicationCharge: application_charge.ApplicationCharge,
    ApplicationCredit: application_credit.ApplicationCredit,
    Article: article.Article,
    Asset: asset.Asset,
    AssignedFulfillmentOrder: assigned_fulfillment_order.AssignedFulfillmentOrder,
    Balance: balance.Balance,
    Blog: blog.Blog,
    CancellationRequest: cancellation_request.CancellationRequest,
    CarrierService: carrier_service.CarrierService,
    Checkout: checkout.Checkout,
    Collect: collect.Collect,
    Collection: collection.Collection,
    CollectionListing: collection_listing.CollectionListing,
    Comment: comment.Comment,
    Country: country.Country,
    Currency: currency.Currency,
    CustomCollection: custom_collection.CustomCollection,
    Customer: customer.Customer,
    CustomerAddress: customer_address.CustomerAddress,
    DeprecatedApiCall: deprecated_api_call.DeprecatedApiCall,
    DiscountCode: discount_code.DiscountCode,
    Dispute: dispute.Dispute,
    DisputeEvidence: dispute_evidence.DisputeEvidence,
    DisputeFileUpload: dispute_file_upload.DisputeFileUpload,
    DraftOrder: draft_order.DraftOrder,
    Event: event.Event,
    Fulfillment: fulfillment.Fulfillment,
    FulfillmentEvent: fulfillment_event.FulfillmentEvent,
    FulfillmentOrder: fulfillment_order.FulfillmentOrder,
    FulfillmentRequest: fulfillment_request.FulfillmentRequest,
    FulfillmentService: fulfillment_service.FulfillmentService,
    GiftCard: gift_card.GiftCard,
    GiftCardAdjustment: gift_card_adjustment.GiftCardAdjustment,
    Image: image.Image,
    InventoryItem: inventory_item.InventoryItem,
    InventoryLevel: inventory_level.InventoryLevel,
    Location: location.Location,
    LocationsForMove: locations_for_move.LocationsForMove,
    MarketingEvent: marketing_event.MarketingEvent,
    Metafield: metafield.Metafield,
    MobilePlatformApplication: mobile_platform_application.MobilePlatformApplication,
    Order: order.Order,
    OrderRisk: order_risk.OrderRisk,
    Page: page.Page,
    Payment: payment.Payment,
    PaymentGateway: payment_gateway.PaymentGateway,
    PaymentTransaction: payment_transaction.PaymentTransaction,
    Payout: payout.Payout,
    Policy: policy.Policy,
    PriceRule: price_rule.PriceRule,
    Product: product.Product,
    ProductListing: product_listing.ProductListing,
    ProductResourceFeedback: product_resource_feedback.ProductResourceFeedback,
    Province: province.Province,
    RecurringApplicationCharge: recurring_application_charge.RecurringApplicationCharge,
    Redirect: redirect.Redirect,
    Refund: refund.Refund,
    Report: report.Report,
    ResourceFeedback: resource_feedback.ResourceFeedback,
    ScriptTag: script_tag.ScriptTag,
    ShippingZone: shipping_zone.ShippingZone,
    Shop: shop.Shop,
    SmartCollection: smart_collection.SmartCollection,
    StorefrontAccessToken: storefront_access_token.StorefrontAccessToken,
    TenderTransaction: tender_transaction.TenderTransaction,
    Theme: theme.Theme,
    Transaction: transaction.Transaction,
    UsageCharge: usage_charge.UsageCharge,
    User: user.User,
    Variant: variant.Variant,
    Webhook: webhook.Webhook,
};

exports.restResources = restResources;
//# sourceMappingURL=index.js.map
