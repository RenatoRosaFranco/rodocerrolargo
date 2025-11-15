import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Taxista from '@/models/Taxista';

// GET - Busca um taxista específico
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const taxista = await Taxista.findById(params.id).select('-__v');

    if (!taxista) {
      return NextResponse.json(
        { success: false, error: 'Taxista não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: taxista,
    });
  } catch (error) {
    console.error('Erro ao buscar taxista:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar taxista' },
      { status: 500 }
    );
  }
}

// PATCH - Atualiza o status de um taxista (aprovar/rejeitar)
export async function PATCH(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();
    const { status, motivoRejeicao, adminPassword } = body;

    // Verifica senha do admin (autenticação simples)
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Senha de administrador inválida' },
        { status: 401 }
      );
    }

    // Valida status
    if (!['aprovado', 'rejeitado', 'pendente'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Prepara dados de atualização
    const updateData = {
      status,
      dataAprovacao: status === 'aprovado' ? new Date() : null,
      aprovadoPor: 'Admin',
    };

    if (status === 'rejeitado' && motivoRejeicao) {
      updateData.motivoRejeicao = motivoRejeicao;
    }

    const taxista = await Taxista.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!taxista) {
      return NextResponse.json(
        { success: false, error: 'Taxista não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Cadastro ${status === 'aprovado' ? 'aprovado' : 'rejeitado'} com sucesso!`,
      data: taxista,
    });
  } catch (error) {
    console.error('Erro ao atualizar taxista:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar cadastro' },
      { status: 500 }
    );
  }
}

// DELETE - Remove um taxista
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const adminPassword = searchParams.get('adminPassword');

    // Verifica senha do admin
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Senha de administrador inválida' },
        { status: 401 }
      );
    }

    const taxista = await Taxista.findByIdAndDelete(params.id);

    if (!taxista) {
      return NextResponse.json(
        { success: false, error: 'Taxista não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cadastro removido com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao deletar taxista:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao remover cadastro' },
      { status: 500 }
    );
  }
}
