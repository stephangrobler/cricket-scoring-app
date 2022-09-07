import { createClient } from '@supabase/supabase-js';


// Create a single supabase client for interacting with your database

export class Supabase {

    supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
    public supabase = createClient(
        'https://qaujdkgbydkyuvxlyaqu.supabase.co',
        this.supabaseKey!
    );

    async getPlayers() {
        const { data, error } = await this.supabase.from('players').select(`
        *,
        groups (
            name,
            organizations(*)

        )
    `);
        return data;
    }

    async addPlayer() {
        const { data, error } = await this.supabase
            .from('players')
            .insert([
                { name: 'Test Player 1',  },
            ])
    }
}