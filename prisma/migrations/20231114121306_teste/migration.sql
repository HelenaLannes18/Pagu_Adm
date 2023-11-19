/*
  Warnings:

  - You are about to drop the column `senderAreaCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `senderName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `senderPhone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressCity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressComplement` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressCountry` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressDistrict` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressPostalCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressState` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressStreet` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "senderAreaCode";
ALTER TABLE "Order" DROP COLUMN "senderName";
ALTER TABLE "Order" DROP COLUMN "senderPhone";
ALTER TABLE "Order" DROP COLUMN "shippingAddressCity";
ALTER TABLE "Order" DROP COLUMN "shippingAddressComplement";
ALTER TABLE "Order" DROP COLUMN "shippingAddressCountry";
ALTER TABLE "Order" DROP COLUMN "shippingAddressDistrict";
ALTER TABLE "Order" DROP COLUMN "shippingAddressNumber";
ALTER TABLE "Order" DROP COLUMN "shippingAddressPostalCode";
ALTER TABLE "Order" DROP COLUMN "shippingAddressState";
ALTER TABLE "Order" DROP COLUMN "shippingAddressStreet";

-- AlterTable
ALTER TABLE "Teste" ADD COLUMN     "address" STRING DEFAULT '';
ALTER TABLE "Teste" ADD COLUMN     "productId" STRING DEFAULT '';
ALTER TABLE "Teste" ADD COLUMN     "userLast" STRING DEFAULT '';
