import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { FRAGRANCE_NOTES, INITIAL_PRODUCTS } from '../lib/data/initialData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Aldenaire Haute Parfumerie database...');

  // 1. Seed Fragrance Notes
  console.log('Seeding fragrance notes...');
  for (const note of FRAGRANCE_NOTES) {
    await prisma.fragranceNote.upsert({
      where: { name: note.name },
      update: {
        type: note.type as any,
        description: note.description,
      },
      create: {
        id: note.id,
        name: note.name,
        type: note.type as any,
        description: note.description,
      },
    });
  }

  // 2. Seed Categories
  console.log('Seeding categories...');
  const categories = [
    { name: 'Extrait de Parfum', slug: 'extrait-de-parfum', description: 'Highest 30% concentration of rare natural absolutes' },
    { name: 'Woody & Oriental', slug: 'woody-oriental', description: 'Rare ouds, sacred sandalwood, and glowing amber' },
    { name: 'Floral & Rose', slug: 'floral-rose', description: 'Dew-kissed Grasse florals and velvety petals' },
    { name: 'Fresh & Oceanic', slug: 'fresh-oceanic', description: 'Mediterranean sea salt, citrus zest, and cold woods' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // 3. Seed Administrator & Demo Client
  console.log('Seeding default users...');
  const adminPasswordHash = await bcrypt.hash('perfume', 10);
  await prisma.user.upsert({
    where: { email: 'admin@aldenaire.com' },
    update: {
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
    create: {
      name: 'Aldenaire Master Parfumeur',
      email: 'admin@aldenaire.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      phone: '+91 9876543210',
    },
  });

  const clientPasswordHash = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'client@aldenaire.com' },
    update: {},
    create: {
      name: 'Lord Henry Sterling',
      email: 'client@aldenaire.com',
      passwordHash: clientPasswordHash,
      role: 'USER',
      phone: '+91 9123456780',
    },
  });

  // 4. Seed Products
  console.log('Seeding products...');
  for (const prod of INITIAL_PRODUCTS) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        description: prod.description,
        shortDescription: prod.shortDescription,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        stock: prod.stock,
        fragranceFamily: prod.fragranceFamily,
        intensity: prod.intensity,
        volume: prod.volume,
        bottleColor: prod.bottleColor,
        is3DSupported: prod.is3DSupported,
      },
      create: {
        id: prod.id,
        legacyId: prod.legacyId,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        shortDescription: prod.shortDescription,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        stock: prod.stock,
        sku: prod.sku,
        fragranceFamily: prod.fragranceFamily,
        intensity: prod.intensity,
        volume: prod.volume,
        bottleColor: prod.bottleColor,
        is3DSupported: prod.is3DSupported,
      },
    });

    // Seed Images
    for (const img of prod.images) {
      await prisma.productImage.upsert({
        where: { id: img.id },
        update: {},
        create: {
          id: img.id,
          productId: createdProduct.id,
          imageUrl: img.imageUrl,
          altText: img.altText,
          sortOrder: img.sortOrder,
          isPrimary: img.isPrimary,
        },
      });
    }

    // Seed Variants
    if (prod.variants) {
      for (const variant of prod.variants) {
        await prisma.productVariant.upsert({
          where: { sku: variant.sku },
          update: {},
          create: {
            id: variant.id,
            productId: createdProduct.id,
            size: variant.size,
            price: variant.price,
            sku: variant.sku,
            stock: variant.stock,
          },
        });
      }
    }

    // Seed Notes Relations
    if (prod.notes) {
      for (const n of prod.notes) {
        await prisma.productFragranceNote.upsert({
          where: {
            productId_noteId: {
              productId: createdProduct.id,
              noteId: n.note.id,
            },
          },
          update: {},
          create: {
            productId: createdProduct.id,
            noteId: n.note.id,
          },
        });
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
