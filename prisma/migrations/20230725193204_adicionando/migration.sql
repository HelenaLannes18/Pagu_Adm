-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "senderAreaCode" STRING;
ALTER TABLE "Order" ADD COLUMN     "senderPhone" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressCity" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressComplement" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressCountry" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressDistrict" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressNumber" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressPostalCode" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressState" STRING;
ALTER TABLE "Order" ADD COLUMN     "shippingAddressStreet" STRING;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "senderName" STRING;
