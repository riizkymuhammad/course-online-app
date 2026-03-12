<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $superAdminRole = Role::findOrCreate('superadmin');
        $fasilitatorRole = Role::findOrCreate('fasilitator');
        $studentRole = Role::findOrCreate('student');

        $superAdmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => '12345678',
            'role' => 'superadmin',
        ]);

        $fasilitator = User::factory()->create([
            'name' => 'Fasilitator',
            'email' => 'fasilitator@example.com',
            'password' => '12345678',
            'role' => 'fasilitator',
        ]);

        $student = User::factory()->create([
            'name' => 'Student',
            'email' => 'student@example.com',
            'password' => '12345678',
            'role' => 'student',
        ]);

        $superAdmin->assignRole($superAdminRole);
        $fasilitator->assignRole($fasilitatorRole);
        $student->assignRole($studentRole);

        $this->call(CourseContentSeeder::class);
    }
}
