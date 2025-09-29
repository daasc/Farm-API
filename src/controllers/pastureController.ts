import prisma from '../config/prisma.js';
import type { PastureInput, ListQuery } from '../types/index.js';
import { handleError } from '../utils/errorUtils.js';
import { calculatePastureDerivedFields } from '../services/pastureCalc.js';
import {
  getPastureChanges,
  getPastureSnapshotForHistory,
} from '../services/historyPastureService.js';

class PastureController {
  async createPasture(payload: PastureInput) {
    try {
      const derived = calculatePastureDerivedFields(payload);
      const pasture = await prisma.pasture.create({ data: { ...payload, ...derived } });

      return { message: 'Pasture created successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getFeedingRecordsByPastureId(pastureId: string) {
    try {
      const pasture = await prisma.pasture.findUnique({
        where: { id: pastureId },
        include: { feedingRecords: true },
      });

      if (!pasture) throw { status: 404, message: 'Pasture not found' };
      return { message: 'FeedingRecords retrieved successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllPastures(query: ListQuery) {
    try {
      const {
        page = 1,
        pageSize = 10,
        search,
        sortBy = 'name',
        sortOrder = 'asc',
        ...filters
      } = query;

      const where: any = { ...filters };
      if (search) {
        where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
      }

      const total = await prisma.pasture.count({ where });
      const pastures = await prisma.pasture.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      });

      return {
        message: 'Pastures retrieved successfully',
        data: pastures,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getPastureById(id: string) {
    try {
      const pasture = await prisma.pasture.findUnique({ where: { id } });
      if (!pasture) throw { status: 404, message: 'Pasture not found' };
      const derived = calculatePastureDerivedFields(pasture as any);
      return { message: 'Pasture retrieved successfully', data: { ...pasture, ...derived } };
    } catch (error) {
      throw handleError(error);
    }
  }

  async updatePasture(id: string, data: Partial<PastureInput>) {
    try {
      // Buscar o pasture antes da atualização
      const oldPasture = await prisma.pasture.findUnique({ where: { id } });
      if (!oldPasture) throw { status: 404, message: 'Pasture not found' };

      // Calcular campos derivados novos
      const derived = calculatePastureDerivedFields({ ...oldPasture, ...data } as any);
      const updateData = { ...data, ...derived };

      // Atualizar o pasture
      const pasture = await prisma.pasture.update({ where: { id }, data: updateData });

      // Comparar mudanças
      const changes = getPastureChanges(oldPasture, { ...oldPasture, ...updateData });

      // Criar snapshot para histórico
      const snapshot = getPastureSnapshotForHistory({ ...pasture });

      // Registrar histórico
      await prisma.historyPasture.create({
        data: {
          pastureId: id,
          updatedAt: new Date(),
          createdAt: pasture.createdAt,
          changes,
          // All required fields from snapshot
          AEF: snapshot.AEF,
          animalsTotal: snapshot.animalsTotal,
          UA: snapshot.UA,
          stockingRate: snapshot.stockingRate,
          feedBunkOffer: snapshot.feedBunkOffer,
          occupation: snapshot.occupation,
          UAExtra: snapshot.UAExtra,
          stockingRateExtra: snapshot.stockingRateExtra,
          deficit: snapshot.deficit,
          name: snapshot.name,
          area: snapshot.area,
          percentAEF: snapshot.percentAEF,
          vacas: snapshot.vacas,
          vacasWeight: snapshot.vacasWeight,
          bezerros: snapshot.bezerros,
          bezerrosWeight: snapshot.bezerrosWeight,
          novilha: snapshot.novilha,
          novilhaWeight: snapshot.novilhaWeight,
          touro: snapshot.touro,
          touroWeight: snapshot.touroWeight,
          gabarro: snapshot.gabarro,
          gabarroWeight: snapshot.gabarroWeight,
          tropa: snapshot.tropa,
          tropaWeight: snapshot.tropaWeight,
          bois: snapshot.bois,
          boisWeight: snapshot.boisWeight,
          animals: snapshot.animals,
          weight: snapshot.weight,
          cocho: snapshot.cocho,
          demand: snapshot.demand,
          observation: snapshot.observation,
          pesoCat: snapshot.pesoCat,
          category: snapshot.category,
        },
      });

      return { message: 'Pasture updated successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
    }
  }

  async deletePasture(id: string) {
    try {
      await prisma.pasture.delete({ where: { id } });
      return { message: 'Pasture deleted successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default PastureController;
